import { Input, Button, Typography, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { getSwapList, createSwap } from "../SwapListAPI";

interface AddSwapModalProps {
  open: boolean;
  onClose: () => void;
}

const AddSwap: React.FC<AddSwapModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const maxPhotos = 2;

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleClose = () => {
    setBookName("");
    setDescription("");
    setPhotos([]);
    setStep(1);
    onClose();
  };

  const handleAddPhoto = (event: any) => {
    if (photos.length < maxPhotos) {
      const file = event.target.files[0];
      setPhotos((prevPhotos) => [...prevPhotos, URL.createObjectURL(file)]);
    } else {
      alert("En fazla 2 fotoğraf ekleyebilirsiniz.");
    }
  };

  // const handleShare = () => {
  //   const data = {
  //     content: description,
  //     offeredBookId: bookName,
  //   };
  //   console.log(data);
  //   try {
  //     createSwapButton(data).then((response) => {
  //       console.log("swap request successful:", response);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   onClose();
  // };

  async function createSwapButton() {
    try {
      const data = { content: description, bookTitle: bookName };
      console.log("data", data);
      await createSwap(data);
    } catch (err) {
      console.log("create swap error", err);
    }
    onClose();
  }

  return (
    <Box className="flex flex-col items-center">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="add-post-modal-title"
        aria-describedby="add-post-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: step === 1 ? 500 : step === 2 ? 600 : 500,
            height: step === 1 ? 300 : step === 2 ? 500 : 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            TAKAS İLANI EKLEME
          </Typography>

          {step === 1 && (
            <div>
              <Input
                className="my-5"
                placeholder="Kitap Adını Giriniz"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
                fullWidth
                sx={{ mt: 2 }}
              >
                İlerle
              </Button>
            </div>
          )}

          {step === 2 && (
            <>
              <Input
                placeholder="Açıklama veya Yorumunuzu Ekleyin"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
              />
              <Button
                variant="contained"
                component="label"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Fotoğraf Ekle
                <input type="file" hidden onChange={handleAddPhoto} />
              </Button>
              <Box className="flex mt-2">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Fotoğraf ${index + 1}`}
                    className="w-20 h-20 m-1 border rounded"
                  />
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePreviousStep}
                fullWidth
                sx={{ mt: 2 }}
              >
                Geri Git
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={createSwapButton}
                fullWidth
                sx={{ mt: 2 }}
              >
                Paylaş
              </Button>
            </>
          )}

          <div className="flex w-full  fixed bottom-2 left-0">
            <Button
              variant="text"
              color="error"
              onClick={handleClose}
              fullWidth
              sx={{ mt: 2 }}
            >
              Kapat
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddSwap;
