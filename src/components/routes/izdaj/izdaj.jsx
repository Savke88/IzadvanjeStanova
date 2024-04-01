// Izdaj.jsx
import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/firebase';
import PoljaForme from './polja-forme';
import PrikazSlika from './prikaz-slika';
import './izdaj.scss';
import Placanje from '../../placanje/placanje';
import paymentSucceeded from '../../placanje/placanje'
import { getAuth } from 'firebase/auth';
const db = getFirestore(app);
const storage = getStorage(app);

const Izdaj = () => {
    const [podaciForme, setPodaciForme] = useState({
        tipImovine: 'Izdavanje',
        tip: '',
        ime: '',
        lokacija: '',
        adresa: '',
        opstina: '',
        cena: '',
        kvadratniMetar: '',
        opis: ''
    });
    const [slike, setSlike] = useState([]);
    const [uploadableImages, setUploadableImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if(slike.length + files.length <= 10) {
            const noveSlike = files.map(file => ({
                file: file,
                prikaz: URL.createObjectURL(file),
                name: file.name
            }));
            setSlike(noveSlike);
            setUploadableImages(files);
        } else {
            alert('Greška, možete maksimalno objaviti 10 slika.');
        }
    }

    const handleRemoveImage = (imageName) => {
        setSlike(slike.filter(slika => slika.name !== imageName));
        setUploadableImages(uploadableImages.filter(file => file.name !== imageName));
    };


    const onSuccessfulPayment = async () => {

        const auth = getAuth(); // Initialize Firebase Auth
        const user = auth.currentUser; // Get the currently signed-in user

        if (!user) {
            alert('You must be signed in to post a property.');
            return;
        }
        
        const imagesUrls = await Promise.all(uploadableImages.map(async (file) => {
            const storageReference = storageRef(storage, `images/${file.name}`);
            const uploadResult = await uploadBytes(storageReference, file);
            return getDownloadURL(uploadResult.ref);
        }));

        // Add a new document with a generated id.
        const docData = {
            ...podaciForme,
            images: imagesUrls,
            createdAt: new Date(),
            userId: user.uid,
        };

        try {
            await addDoc(collection(db, 'Nektretnine'), docData);
            // Reset form and state after successful submission
            setPodaciForme({
                tipImovine: 'Izdavanje',
                tip: '',
                ime: '',
                lokacija: '',
                adresa: '',
                opstina: '',
                cena: '',
                kvadratniMetar: '',
                opis: ''
            });
            setSlike([]);
            if(paymentSucceeded){
            alert('Vaša nekretnina je uspešno objavljena i plaćanje je izvršeno.');
            }else {
            alert('Vaša nekretnina je uspešno objavljena i plaćanje je izvršeno.');
        }
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Greška prilikom dodavanja dokumenta.');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form className='izdaj-forma' onSubmit={handleFormSubmit}>
                <h1>Izdajte ili prodajte vašu nektretninu</h1>
                <PoljaForme podaciForme={podaciForme} setPodaciForme={setPodaciForme} />
                <input
                    id="slike"
                    type="file"
                    name='slike'
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <PrikazSlika slike={slike} setSlike={setSlike} onRemove={handleRemoveImage} />
                <Placanje onSuccessfulPayment={onSuccessfulPayment}  />
            </form>
        </>
    );
};

export default Izdaj;