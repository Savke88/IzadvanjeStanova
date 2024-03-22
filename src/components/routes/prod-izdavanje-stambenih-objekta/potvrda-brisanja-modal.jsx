import './potvrda-brisanja-modal.scss'

const PotvrdaBrisanjaModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <h2>Potvrda birsanja</h2>
          <p>Da li ste sigurni da želite da izbrišete objavu, klikni na dugme "Obriši" će trajno obriati vašu objavu</p>
          <button onClick={onConfirm}>Obriši</button>
          <button onClick={onClose}>Otkaži</button>
        </div>
      </div>
    );
  };

  export default PotvrdaBrisanjaModal