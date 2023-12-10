//UI Positions
const PLANET_POSITION_OFFSET = [-3, 5]
const SHIP_OFFSET = [1, 2]
const TIME_MARKER_OFFSET = [3, 3]
const EARTH_POSITIONS = [[328,174], [328,286]]
const MARS_POSITIONS = [[255,300],[255,160], [449,244]]
const JUPITER_POSITIONS = [
    [352,328], [182, 286], [206, 160], [400,132], [497,244]
]
const SATURN_POSITIONS = [
    [110,244], [182, 118], [376,90], [497,160], [521,286], [376,370], [206,356]
]
const URANUS_POSITIONS = [
    [110,329], [85,174], [206, 76], [376,62], [521,118], [595,244], [521,342], [376,398], [231,398]
]
const NEPTUN_POSITIONS = [
    [61,160], [182, 63], [328,34], [449,48], [570,118], [619,230], [570,342], [425,426], [279,426], [158,384], [61,301]
]
const PLANETS = [EARTH_POSITIONS, MARS_POSITIONS, JUPITER_POSITIONS, SATURN_POSITIONS, URANUS_POSITIONS, NEPTUN_POSITIONS]
const TU_POSITIONS = [[1,258.4],[1,235],[1,211.6],[1,188.2],[1,164.8],[1,141.4],[1,118],[1,94.6],[1,71.2],[1,47.8],[1,24.4],[1,1],[24.4,1],[47.8,1],[71.2,1],[94.6,1],[118,1],[141.4,1],[164.8,1],[188.2,1],[211.6,1],[235,1],[258.4,1],[281.8,1],[305.2,1],[328.6,1],[352,1],[375.4,1],[398.8,1],[422.2,1],[445.6,1],[469,1],[492.4,1],[515.8,1],[539.2,1],[562.6,1],[586,1],[609.4,1],[632.8,1],[656.2,1],[679.6,1],[679.6,24.4],[679.6,47.8],[679.6,71.2],[679.6,94.6],[679.6,118],[679.6,141.4],[679.6,164.8],[679.6,188.2],[679.6,211.6],[679.6,235],[679.6,258.4],[679.6,281.8],[679.6,305.2],[679.6,328.6],[679.6,352],[679.6,375.4],[679.6,398.8],[679.6,422.2],[679.6,445.6],[679.6,469],[656.2,469],[632.8,469],[609.4,469],[586,469],[562.6,469],[539.2,469],[515.8,469],[492.4,469],[469,469],[445.6,469],[422.2,469],[398.8,469],[375.4,469],[352,469]];

let MAINBOARD_OFFSET = [0, 0]
let DRAWING_PILE_OFFSET = [0, 0]
let DISCARD_PILE_OFFSET = [0, 0]

//State
let TIME_SPENT = 0
let TIME_STACK_POSITION = 0
let CURRENT_PLANET_POSITIONS = [0, 0, 0, 0, 0, 0]
let SPACESHIP_POSITION = [0, 0]
let NEXT_ROTATE_EVENT = 10
let NEXT_PASSENGER_EVENT = 20
let END_EVENT = 120
let PASSENGER_DECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
let DISCARD_PILE = []
let PLANET_PASSENGERS = [[], [], [], [], [], []]
let SHIP_PASSENGERS = [0, 0, 0, 0]
let HISTORY = []


function handleClick(asd) {
    //alert('Clicked on the specified area!' + asd);
    console.log('Clicked on the specified area!' + asd)
    // You can replace the alert with your custom logic
}

function setImagePosition() {
    var image = document.getElementById('mainboard');
    var rect = image.getBoundingClientRect();
    MAINBOARD_OFFSET[0] = rect.left
    MAINBOARD_OFFSET[1] = rect.top + 140
    DRAWING_PILE_OFFSET[0] = rect.left + 701 + 35
    DRAWING_PILE_OFFSET[1] = rect.top + 140 + 25
    DISCARD_PILE_OFFSET[0] = rect.left + 701 + 35
    DISCARD_PILE_OFFSET[1] = rect.top + 140 + 75
}

function getPosition(time_spent)
{
    var time_space = time_spent % 75
    return [TU_POSITIONS[time_space][0], TU_POSITIONS[time_space][1]]
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
  

function createTimeSpaces()
{
    for (let i = 0; i <= 74; i++) {
        let newDiv = document.createElement('div');
        let position = getPosition(i)
        newDiv.className = 'square';
        newDiv.id = 'TU_' + i
        newDiv.addEventListener('click', function(){
            handleClick(i)});
        newDiv.style.left = position[0] + MAINBOARD_OFFSET[0] + 'px'
        newDiv.style.top = position[1] + MAINBOARD_OFFSET[1] + 'px'
        document.body.appendChild(newDiv);
      }
}

function createHexSpaces()
{
    for(let planet=0;planet<PLANETS.length;planet++){
        for(let i=0;i<PLANETS[planet].length;i++){
            let newDiv = document.createElement('div');
            let position = PLANETS[planet][i]
            newDiv.className = 'hex';
            newDiv.id = 'Planet_' + planet + "_" + i
            newDiv.addEventListener('click', function(){
                handleClick("Neptun" + i)});
            newDiv.style.left = position[0] + MAINBOARD_OFFSET[0] + 'px'
            newDiv.style.top = position[1] + MAINBOARD_OFFSET[1] + 'px'
            document.body.appendChild(newDiv);
        }
    }
}

function moveMarkerToTu(marker_name, tu)
{
    var time_space = tu % 75
    let time_marker = document.getElementById(marker_name);
    time_marker.style.left = MAINBOARD_OFFSET[0] + TU_POSITIONS[time_space][0] + TIME_MARKER_OFFSET[0] + 'px'
    time_marker.style.top = MAINBOARD_OFFSET[1] + TU_POSITIONS[time_space][1] + TIME_MARKER_OFFSET[1] + 'px'
    time_marker.style.position = 'absolute';
    time_marker.style.display = 'block';
}

function setup(seed, difficulty)
{
    HISTORY.push({
        'seed': seed,
        'difficulty': difficulty
    })
    END_EVENT = difficulty
    Math.seedrandom(seed);
    shuffle(PASSENGER_DECK);
    console.log(HISTORY)
}


function handleMouseClick(event) {
    // Get the mouse coordinates
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Log the coordinates to the console (you can use them as needed)
    console.log(`Mouse Click Position: X=${mouseX}, Y=${mouseY}`);
}

function setPosition(element_id, position)
{
    let el = document.getElementById(element_id)
    el.style.left = position[0]
    el.style.top = position[1]
    el.style.position = 'absolute';
    el.style.display = 'block';
}

function refreshUI()
{
    setImagePosition()
    //TU
    for (let i = 0; i <= 74; i++) {
        let div = document.getElementById('TU_' + i)
        div.style.left = TU_POSITIONS[i][0] + MAINBOARD_OFFSET[0] + 'px'
        div.style.top = TU_POSITIONS[i][1] + MAINBOARD_OFFSET[1] + 'px'
    }
    //Hex
    for(let planet=0;planet<PLANETS.length;planet++){
        for(let i=0;i<PLANETS[planet].length;i++){
            let div = document.getElementById('Planet_' + planet + "_" + i)
            div.style.left = PLANETS[planet][i][0] + MAINBOARD_OFFSET[0] + 'px'
            div.style.top = PLANETS[planet][i][1] + MAINBOARD_OFFSET[1] + 'px'
        }
    }
    let planet_markers = ['earth_marker', 'mars_marker', 'jupiter_marker', 'saturn_marker', 'uranus_marker', 'neptun_marker']
    for(let marker=0;marker<planet_markers.length;marker++){
        let image = document.getElementById(planet_markers[marker]);
        image.style.left = PLANETS[marker][CURRENT_PLANET_POSITIONS[marker]][0] + MAINBOARD_OFFSET[0] + PLANET_POSITION_OFFSET[0] + 'px'
        image.style.top = PLANETS[marker][CURRENT_PLANET_POSITIONS[marker]][1] + MAINBOARD_OFFSET[1] + PLANET_POSITION_OFFSET[1] + 'px'
        image.style.position = 'absolute';
        image.style.display = 'block';
    }

    let ship_marker = document.getElementById('ship_marker');
    ship_marker.style.left = MAINBOARD_OFFSET[0] + PLANETS[SPACESHIP_POSITION[0]][SPACESHIP_POSITION[1]][0] + SHIP_OFFSET[0] + 'px'
    ship_marker.style.top = MAINBOARD_OFFSET[1] + PLANETS[SPACESHIP_POSITION[0]][SPACESHIP_POSITION[1]][1] + SHIP_OFFSET[1] + 'px'
    ship_marker.style.position = 'absolute';
    ship_marker.style.display = 'block';

    let drawing_pile = document.getElementById('drawing_pile')
    drawing_pile.style.left = DRAWING_PILE_OFFSET[0] + "px"
    drawing_pile.style.top = DRAWING_PILE_OFFSET[1] + "px"
    drawing_pile.style.position = 'absolute';
    drawing_pile.style.display = 'block';
    if(PASSENGER_DECK.length == 0)
    {
        drawing_pile.src = "pics/empty.png"
    }
    else
    {
        drawing_pile.src = "pics/back.png"
    }

    let discard_pile = document.getElementById('discard_pile')
    discard_pile.style.left = DISCARD_PILE_OFFSET[0] + "px"
    discard_pile.style.top = DISCARD_PILE_OFFSET[1] + "px"
    discard_pile.style.position = 'absolute';
    discard_pile.style.display = 'block';
    if(DISCARD_PILE.length == 0)
    {
        discard_pile.src = "pics/empty.png"
    }
    else
    {
        discard_pile.src = "pics/" + DISCARD_PILE[DISCARD_PILE.length - 1] + ".png"
    }

    moveMarkerToTu('time_marker', TIME_SPENT)
    moveMarkerToTu('rotate_marker', NEXT_ROTATE_EVENT)
    moveMarkerToTu('passenger_marker', NEXT_PASSENGER_EVENT)
    moveMarkerToTu('end_marker', END_EVENT)
}

function handleResize() {
    refreshUI()
}

// Call the function when the page is loaded
window.onload = function () {
    setImagePosition()
    createTimeSpaces()
    createHexSpaces()
    setup('holymoly', 120)
    refreshUI()
};
document.addEventListener('click', handleMouseClick);
window.addEventListener('resize', handleResize);

