import { Input, Button, Typography, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { addUserPost } from "./AddPostAPI";
import { useUserContext } from "../../../../context/UserContext";

interface AddPostModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const AddPost: React.FC<AddPostModalProps> = ({ open, onClose, onSuccess }) => {
  const { fetchPosts } = useUserContext();
  const { darkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };
  const [step, setStep] = useState(1);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [ratingLabel, setRatingLabel] = useState<string>("");
  const maxPhotos = 2;

  const customIcons: Record<number, { icon: React.ReactNode; label: string }> =
    {
      1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: t("addPost.rating.1"),
      },
      2: {
        icon: <SentimentDissatisfiedIcon color="secondary" />,
        label: t("addPost.rating.2"),
      },
      3: {
        icon: <SentimentSatisfiedIcon color="inherit" />,
        label: t("addPost.rating.3"),
      },
      4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: t("addPost.rating.4"),
      },
      5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: t("addPost.rating.5"),
      },
    };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

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
      alert(t("addPost.maxPhotosAlert"));
    }
  };

  const handleShare = async () => {
    try {
      if (!bookName || !description) return;

      await addUserPost(bookName, description);
      fetchPosts(); // ← gönderi sonrası listeyi güncelle

      alert(t("addPost.sharedAlert"));
      handleClose();
    } catch (err) {
      console.error("Gönderi eklenemedi:", err);
    }
  };

  return (
    <Box className="flex flex-col items-center">
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "80%", md: "60%" },
            maxWidth: 600,
            bgcolor: darkMode ? "#1e1e1e" : "background.paper",
            color: darkMode ? "#fff" : "#000",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            {t("addPost.title")}
          </Typography>

          {step === 1 && (
            <Box>
              <Input
                className="my-5"
                placeholder={t("addPost.bookNamePlaceholder")}
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                fullWidth
                sx={{
                  bgcolor: darkMode ? "#333" : "#f0f0f0",
                  borderRadius: 1,
                  p: 1,
                  color: darkMode ? "#fff" : "#000",
                }}
              />
              <Box className="flex flex-col">
                <StyledRating
                  sx={{
                    "& svg": {
                      fill: darkMode ? "gray" : "#000",
                      fontSize: "2rem",
                    },
                  }}
                  name="highlight-selected-only"
                  IconContainerComponent={IconContainer}
                  onChange={(event, newValue) => {
                    const label =
                      newValue !== null
                        ? customIcons[newValue as number]?.label
                        : "Unknown";
                    setRatingLabel(label);
                  }}
                  highlightSelectedOnly
                />
                <span className="py-2 text-xl">{ratingLabel}</span>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
                fullWidth
                sx={{ mt: 2 }}
              >
                {t("addPost.next")}
              </Button>
            </Box>
          )}

          {step === 2 && (
            <>
              <Input
                placeholder={t("addPost.descriptionPlaceholder")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                sx={{
                  bgcolor: darkMode ? "#333" : "#f0f0f0",
                  borderRadius: 1,
                  p: 1,
                  color: darkMode ? "#fff" : "#000",
                }}
                fullWidth
              />
              <Button
                variant="contained"
                component="label"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                {t("addPost.addPhoto")}
                <input type="file" hidden onChange={handleAddPhoto} />
              </Button>
              <Box
                className="flex mt-2"
                sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
              >
                {photos.map((photo, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={photo}
                    alt={`Fotoğraf ${index + 1}`}
                    sx={{
                      width: 80,
                      height: 80,
                      border: "1px solid",
                      borderColor: darkMode ? "#555" : "#ccc",
                      borderRadius: 1,
                    }}
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
                {t("addPost.back")}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleShare}
                fullWidth
                sx={{ mt: 2 }}
              >
                {t("addPost.share")}
              </Button>
            </>
          )}

          <Button
            variant="text"
            color="error"
            onClick={handleClose}
            fullWidth
            sx={{
              bgcolor: "#bf0000",
              mt: 2,
              color: "white",
              "&:hover": { bgcolor: darkMode ? "red" : "" },
            }}
          >
            {t("addPost.close")}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddPost;
