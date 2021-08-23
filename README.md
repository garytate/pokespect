# <h1 align="center">pokespect</h1>
Pokespect is a lightweight, modern Pokedex - harnessing the PokeAPI project to provide a fast and responsive Pokedex.

A demo can be found on my website, [here.](https://garytate.co.uk/pokespect/#/)

Built from scratch with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Material-UI](https://material-ui.com/) and more.

## 💻 Getting Started
### Prerequisites

To run pokespect, you will need Node.JS installed.

### Install the dependencies

```shell
npm install
```

### Start the application

```shell
npm run start
```

The application will open on port `3000` by default.

## 📘 Libraries / Modules
### Material UI
For the styling aspect of this application, I used Material UI to allow for quick prototyping of functionality, to be able to focus my time mainly on the functionality of the page.

### Axios
To simplify the HTTP requests from the pokeapi server, Axios was an ideal choice to process fast and readable HTTP requests in my program.

## ⌚ Challenges
### Generations
I spent a while confused at the PokeAPI documentation, trying to figure out where generations are held as a property on each pokemon.  After looking at the large list of Pokemon, I realised that the Pokemon were ordered by generation - allowing me to setup a constant lookup table which I could reference.

### Design
When I first began the project, I was unsure as to how to design the website - due to the time constraints, I began building the application immediately with little to no styling, beginning to construct small design ideas once the main structure was finished.  I also referenced ideas from several other websites, including the official Pokedex.

### Time Frame
Given the scope of the project which I had in mind, it was difficult to crunch the design, planning and development of the project within the initial three days - after the three days concluded, I had an acceptable project - however I plan to continue supporting and updated the web application, learning more about the technologies as I use them.  During the initial three days I was required to take several shortcuts which I would not use in a professional setting, such as carelessly using in-line styling and using the `<any>` type with TypeScript.

## ✨ Extra Features
### Search Bar
Using MaterialUI components, I built a search bar which is able to search throughout the pokedex and provide auto-complete functionality to find the pokemon you are looking for.  To do this, I decided to include an array in `data.ts` which would map out all the pokemon and the corresponding ID. I decided that it was worth the extra file size to include the information, as it was constantly referenced and would not be efficient to continiously fetch from the API, especially given the 20 limit on each call.

## 🌗 Future Additions

As this is a project I have greatly enjoyed, I have decided to continue supporting and updating pokespect going forward from the project.

### Testing
Now that the application has been developed to a point it can be used, testing is important to add and implement properly - to catch issues and any edge-cases which I would not discover myself.  Given the time constraints during the project, I was unable to add tests - however they will be added soon as I continue to improve on this project.
### Design Improvements
Given the time constraints for the project, I was required to cut a lot of corners on the overall design of the web app. A main issue I would fix is the "Search Pokedex" and "Generation" buttons on the main browser, as they do not fit in with the design of the application.

### More Pokemon Information
When viewing a Pokemon in the Overview, the information card is extremely lacking and would be an ideal place to provide more information, especially when located next to the Attack Moves card which would benefit from being shortened.

### Compare Reworked
The comparison component is extremely lacking and could be improved with a better design, as well as a more functional method of loading Pokemon into the table, as the current method is rather poor, needing to use a text input which is not part of the comparison table.

### Browser Sorting
The main browser can be easily improved with the addition of a sorting method, such as `Sort by Type`, `Sort by Favourites`,  `Sort by Height`, etc.  The browser could also be improved by allowing the search input to filter the cards.
