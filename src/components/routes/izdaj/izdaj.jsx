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
        const mappedFiles = files.map((file) => ({
            file,
            prikaz: URL.createObjectURL(file),
            name: file.name,
        }));

        setSlike(mappedFiles);
        setUploadableImages(files);
    };

    const handleRemoveImage = (imageName) => {
        setSlike(slike.filter((slika) => slika.name !== imageName));
        setUploadableImages(uploadableImages.filter((file) => file.name !== imageName));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imagesUrls = await Promise.all(
            uploadableImages.map(async (file) => {
                const storageReference = storageRef(storage, `images/${file.name}`);
                const uploadResult = await uploadBytes(storageReference, file);
                return getDownloadURL(uploadResult.ref);
            }),
        );

        const podaciZaCuvanje = {
            ...podaciForme,
            images: imagesUrls,
            createdAt: new Date(),
        };

        try {
            await addDoc(collection(db, 'Nektretnine'), podaciZaCuvanje);
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
            setUploadableImages([]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <PrikazSlika slike={slike} onRemove={handleRemoveImage} />
            <label htmlFor="file-upload" className="lazni-image-input">
                Umetnite slike vašeg stambenog objekta
            </label>
            <small>Možete dodati do 10 slika.</small>
            <Placanje />
            <button type="submit">Objavi</button>
        </form>
    );
};

export default Izdaj;
