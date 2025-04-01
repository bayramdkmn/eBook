import { Input, Button, Typography, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { getSwapList, createSwap } from "../SwapListAPI";
import { useTheme } from "../../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

interface AddSwapModalProps {
  open: boolean;
  onClose: () => void;
}

const AddSwap: React.FC<AddSwapModalProps> = ({ open, onClose }) => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string) => string;
  };

  const [step, setStep] = useState(1);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const maxPhotos = 2;

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () =>
    step > 1 && setStep((prevStep) => prevStep - 1);

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
      alert(t("addSwap.maxPhotosAlert"));
    }
  };

  async function createSwapButton() {
    try {
      const data = { content: description, bookTitle: bookName };
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
            bgcolor: darkMode ? "#1e1e1e" : "background.paper",
            color: darkMode ? "#fff" : "#000",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            transition: "all 0.3s ease",
          }}
        >
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            {t("addSwap.title")}
          </Typography>

          {step === 1 && (
            <div>
              <Input
                className="my-5"
                placeholder={t("addSwap.bookNamePlaceholder")}
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                fullWidth
                sx={{
                  input: {
                    color: darkMode ? "white" : "black",
                  },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
                fullWidth
                sx={{ mt: 2 }}
              >
                {t("addSwap.next")}
              </Button>
            </div>
          )}

          {step === 2 && (
            <>
              <Input
                placeholder={t("addSwap.descriptionPlaceholder")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                sx={{
                  input: {
                    color: darkMode ? "white" : "black",
                  },
                }}
              />
              <Button
                variant="contained"
                component="label"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                {t("addSwap.addPhoto")}
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
                {t("addSwap.back")}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={createSwapButton}
                fullWidth
                sx={{ mt: 2 }}
              >
                {t("addSwap.share")}
              </Button>
            </>
          )}

          <div className="flex w-full fixed bottom-2 left-0">
            <Button
              variant="text"
              color="error"
              onClick={handleClose}
              fullWidth
              sx={{ mt: 2 }}
            >
              {t("addSwap.close")}
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddSwap;
