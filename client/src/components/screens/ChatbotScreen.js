import React from "react";
import {
  Box,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
  Collapse,
  Alert,
  TextField,
  Button,
  Card,
  Stack,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

import "./bubble.css";

const ChatbotScreen = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);

  const responseHandler = async (e) => {
    e.preventDefault();
    setQuestionArray((prevItems) => [...prevItems, text]);
    setText("");

    try {
      const { data } = await axios.post("/api/openai/chatbot", { text });
      setAnswerArray((prevItems) => [...prevItems, data]);
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
    }
  };

  return (
    <Box
      width={isNotMobile ? "50%" : "90%"}
      p="2rem"
      m="2rem auto"
      borderRadius={5}
      backgroundColor={theme.palette.background.alt}
      sx={{ boxShadow: 5 }}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={responseHandler}>
        <Typography variant="h3" mb={2}>
          Chat Bot
        </Typography>
        <Stack direction="row" spacing={1}>
          <Box width="93%">
            <TextField
              multiline="true"
              placeholder="Enter question topic here"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>
          <Button
            disableElevation
            variant="contained"
            type="submit"
            sx={{ color: "white", backgroundColor: "blue" }}
          >
            Ask
          </Button>
        </Stack>
      </form>

      <Card
        sx={{
          mt: 4,
          p: 2,
          border: 1,
          boxShadow: 0,
          borderColor: "neutral.medium",
          borderRadius: 2,
          height: "300px",
          bgcolor: "background.default",
        }}
        style={{ overflow: "scroll" }}
      >
        <Typography color="primary.dark">
          {questionArray.length > 0 &&
            questionArray.map((EachQ, index) => (
              <div>
                <div className="bubble right">{EachQ}</div>

                <div className="bubble left">
                  {!!answerArray[index] && answerArray[index]}
                </div>
              </div>
            ))}
        </Typography>
      </Card>
    </Box>
  );
};

export default ChatbotScreen;
