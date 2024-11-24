import { Input, Button, Typography, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
interface AddPostModalProps {
  open: boolean;
  onClose: () => void;
}

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Tavsiye Etmem",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="secondary" />,
    label: "Kötü",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="inherit" />,
    label: "Orta Halli",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "İyi",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Muhteşem",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const AddPost: React.FC<AddPostModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [ratingLabel, setRatingLabel] = useState<string>("");
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

  const handleShare = () => {
    alert("Gönderi paylaşıldı!");
    onClose();
  };

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
            GÖNDERİ EKLEME
          </Typography>

          {step === 1 && (
            <div>
              <Input
                className="my-5"
                placeholder="Eğer Varsa Paylaşmak İstediğiniz Kitap Adını Giriniz"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                fullWidth
              />
              <div className="flex flex-col">
                <StyledRating
                  name="highlight-selected-only"
                  IconContainerComponent={IconContainer}
                  onChange={(event, newValue) => {
                    const label =
                      newValue !== null
                        ? customIcons[newValue]?.label
                        : "Unknown";
                    setRatingLabel(label);
                  }}
                  highlightSelectedOnly
                />
                <span>{ratingLabel}</span>
              </div>

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
                onClick={handleShare}
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

export default AddPost;
