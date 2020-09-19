# Rethink Plaintext Editing

This is our frontend coding challenge. It gives us a chance to see your abilities and how you approach problems. It is designed to give you unlimited creative freedom as you develop a solution. Feel free to use any packages/tools/etc. you'd like to edit text as elegantly as possible. There are a variety of different file types to experiment with as you see fit.

To run the challenge:

- Clone or download this repo and `cd rethink-plaintext-editing`
- Run `npm install && npm run dev`
- Open `localhost:3000` in your browser
- Enjoy

Once complete, please email a link to a GitHub repo of clean, tested code to us. We will use Chrome to run it.

- Rethink Engineering
# Steps that need to be taken
Goal: Allow the user to click on the preview to start editing the text
Better Goal: Allow the user to edit the text inline
1. When the user clicks on the previewer open up a textarea box and move all the contents from the previewer into the textarea
2. Use the package [Marked](https://github.com/markedjs/marked) to convert markdown to HTML. Have whatever the user is typing appear in the preview window.
3. Saving what the user wrote to the respective file
    - save the content if its different from before
    - as the contents change save it to the state (onChange)
    - after the user clicks out of the textarea or clicks save button write the state to the respective file