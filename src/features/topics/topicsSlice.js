import { createSlice } from "@reduxjs/toolkit";
import { addQuiz } from "../quizzes/quizzesSlice";

const initialState = {
  topics: {},
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuiz, (state, action) => {
        const { id, topicId } = action.payload;

        if (state.topics[topicId]) {
          state.topics[topicId].quizIds.push(id);
        } else {
          console.error(`Topic with ID ${topicId} not found`);
        }
      });
  }
});

export const selectTopics = (state) => state.topics.topics;
export const { addTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
