// Izdaj.jsx
import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/firebase';
import PoljaForme from './polja-forme';
import PrikazSlika from './prikaz-slika';
import './izdaj.scss';
import Placanje from '../../placanje/placanje';

const db = getFirestore(app);
const storage = getStorage(app);

const Izdaj = () => {
    const [podaciForme, setPodaciForme] = useState({
        tipImovine: '',
        tip: '',
        ime: '',
        lokacija: '',
        adresa: '',
        opstina: '',
        cena: '',
        kvadratniMetar: '',
    });
    const [slike, setSlike] = useState([]);
    const [uploadableImages, setUploadableImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const noveSlike = files.map(file => ({
            file: file,
            prikaz: URL.createObjectURL(file),
            name: file.name
        }));
        setSlike(noveSlike);
        setUploadableImages(files);
    };

    const handleRemoveImage = (imageName) => {
        setSlike(slike.filter(slika => slika.name !== imageName));
        setUploadableImages(uploadableImages.filter(file => file.name !== imageName));
    };

    const handlePaymentSubmit = async () => {
        // Payment logic will be triggered here
        // Dummy implementation for demonstration
        return true; // This should be the result of the payment process
    };

    const onSuccessfulPayment = async () => {
        // Upload images to Firebase Storage and get their URLs
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
        };

        try {
            await addDoc(collection(db, 'Nektretnine'), docData);
            // Reset form and state after successful submission
            setPodaciForme({
                tipImovine: '',
                tip: '',
                ime: '',
                lokacija: '',
                adresa: '',
                opstina: '',
                cena: '',
                kvadratniMetar: '',
            });
            setSlike([]);
            alert('Vaša nekretnina je uspešno objavljena i plaćanje je izvršeno.');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Greška prilikom dodavanja dokumenta.');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const paymentSuccess = await handlePaymentSubmit();
        if (paymentSuccess) {
            onSuccessfulPayment();
        } else {
            alert('Plaćanje nije bilo uspešno, molimo vas pokušajte ponovo');
        }
    };

    return (
        <>
            <form className='izdaj-forma' onSubmit={handleFormSubmit}>
                <h1>Izdajte ili prodajte vašu nektretninu</h1>
                <PoljaForme podaciForme={podaciForme} setPodaciForme={setPodaciForme} />
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <PrikazSlika slike={slike} setSlike={setSlike} onRemove={handleRemoveImage} />
                <label htmlFor="file-upload" className="lazni-image-input">
                    Umetnite slike vašeg stambenog objekta
                </label>
                <small>Možete dodati do 10 slika.</small>
                <Placanje onSuccessfulPayment={onSuccessfulPayment} onPaymentSubmit={handlePaymentSubmit} />
            </form>
        </>
    );
};

export default Izdaj;
