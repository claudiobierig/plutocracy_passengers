//UI Positions
const PLANET_POSITION_OFFSET = [-3, 5]
const SHIP_POSITION_OFFSET = [1, 2]
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
let PLANET_OFFSET = [0, 0]
let SHIP_OFFSET = [0, 0]

//State
const CHOOSE_STARTING_POSITION = 0
const PLAYER_TURN = 1
const ROTATION_TURN = 2
const PASSENGER_TURN = 3
const END_TURN = 4

let TIME_SPENT = [0,0]
let CURRENT_PLANET_POSITIONS = [0, 0, 0, 0, 0, 0]
let SPACESHIP_POSITION = []
let NEXT_ROTATE_EVENT = [10, 0]
let NEXT_PASSENGER_EVENT = [0, 0]
let END_EVENT = [120, 0]
let PASSENGER_DECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
let DISCARD_PILE = []
let PLANET_PASSENGERS = [[], [], [], [], [], []]
let SHIP_PASSENGERS = [0, 0, 0, 0]
let CURRENT_TURN = {}
let NEXT_TURN_TYPE = CHOOSE_STARTING_POSITION
let HISTORY = []


function onClickTimeSpace(tu)
{
    if(NEXT_TURN_TYPE != PLAYER_TURN){
        return
    }
    if(!CURRENT_TURN.hasOwnProperty('destination'))
    {
        return
    }
    //TODO compute minimal time from position and CURRENT_TURN['destination']
    let minimal_time = TIME_SPENT[0] + 5
    let arrival_time = tu
    while(arrival_time < minimal_time){
        arrival_time += 75
    }
    CURRENT_TURN['arrival_time'] = arrival_time
    refreshUI()
}

function onClickPlanet(planet){
    onClickHex(planet, CURRENT_PLANET_POSITIONS[planet])
}

function onClickHex(planet, number)
{
    if(NEXT_TURN_TYPE == PLAYER_TURN){
        CURRENT_TURN['destination'] = [planet, number]
        if(!CURRENT_TURN.hasOwnProperty('arrival_time'))
        {
            //TODO correct time increasing property
            CURRENT_TURN['arrival_time'] = TIME_SPENT[0] + 5
        }
    }
    else if(NEXT_TURN_TYPE==CHOOSE_STARTING_POSITION)
    {
        CURRENT_TURN = {"destination": [planet, number]}
    }
    else
    {
        return
    }
    refreshUI()
    console.log('onClickHex: ' + planet + "," + number)
}

function onClickPlanetPassenger(planet, number)
{
    console.log('onClickPlanetPassenger: ' + planet + "," + number)
}

function reset_turn()
{
    CURRENT_TURN = {}
    refreshUI()
}

function end_turn()
{
    if(NEXT_TURN_TYPE==CHOOSE_STARTING_POSITION){
        if(CURRENT_TURN.hasOwnProperty('destination')){
            
            SPACESHIP_POSITION = CURRENT_TURN['destination']
        }
    }
    else if(NEXT_TURN_TYPE==PLAYER_TURN)
    {
        if(CURRENT_TURN.hasOwnProperty('destination'))
        {
            SPACESHIP_POSITION = CURRENT_TURN['destination']
            let markers = [NEXT_ROTATE_EVENT, NEXT_PASSENGER_EVENT, END_EVENT]
            let stack_position = markers.filter(function(arr){return arr[0] == CURRENT_TURN['arrival_time']}).length
            TIME_SPENT = [
                CURRENT_TURN['arrival_time'], 
                stack_position
            ]
            //TODO: change passengers
        }
    }
    else
    {
        return
    }
    CURRENT_TURN = {}
    perform_next_turn()
    refreshUI()    
}

function setNextTurnType()
{
    if(SPACESHIP_POSITION.length == 0){
        return CHOOSE_STARTING_POSITION
    }
    let turns = [
        [PLAYER_TURN, TIME_SPENT],
        [ROTATION_TURN, NEXT_ROTATE_EVENT],
        [PASSENGER_TURN, NEXT_PASSENGER_EVENT],
        [END_TURN, END_EVENT]
    ]
    turns.sort(function(l, r){
        if(l[1][0]<r[1][0] || (l[1][0]==r[1][0] && l[1][1]>r[1][1])){
            return -1
        }
        return 1
    })
    NEXT_TURN_TYPE = turns[0][0]
}

function perform_next_turn()
{
    setNextTurnType()
    if(NEXT_TURN_TYPE == ROTATION_TURN)
    {
        perform_rotation_event()
    }
    else if(NEXT_TURN_TYPE == PASSENGER_TURN)
    {
        perform_passenger_event()
    }
    else if(NEXT_TURN_TYPE == END_TURN)
    {
        perform_end_event()
    }
}

function passenger_is_first_class(passenger){
    return (passenger%3) == 1
}

function passenger_is_for_planet(passenger, planet){
    return planet*3 < passenger && passenger <= (planet+1)*3
}

function draw_passenger(planet)
{
    if(PASSENGER_DECK.length == 0){
        if(DISCARD_PILE.length == 0){
            throw new Error("You loose. No more passengers.");
        }
        if(DISCARD_PILE.every(function(passenger){
            return passenger_is_for_planet(passenger, planet)
        })){
            return 0
        }
        PASSENGER_DECK = DISCARD_PILE
        DISCARD_PILE = []
        shuffle(PASSENGER_DECK)
    }
    passenger = PASSENGER_DECK.pop()
    if(passenger_is_for_planet(passenger, planet)){
        DISCARD_PILE.push(passenger)
        return draw_passenger(planet)
    }
    return passenger    
}

function perform_passenger_event()
{
    for(let planet=0;planet<CURRENT_PLANET_POSITIONS.length;planet++){
        if(PLANET_PASSENGERS[planet].length >=3)
        {
            throw new Error("You loose. Already 3 passengers at "+ planet);
        }
        passenger = draw_passenger(planet)
        if(passenger != 0){
            PLANET_PASSENGERS[planet].push(passenger)
        }
    }
    let markers = [TIME_SPENT, NEXT_ROTATE_EVENT, END_EVENT]
    let stack_position = markers.filter(function(arr){return arr[0] == NEXT_PASSENGER_EVENT[0] + 20}).length
    NEXT_PASSENGER_EVENT = [
        NEXT_PASSENGER_EVENT[0] + 20, 
        stack_position
    ]
    perform_next_turn()
}

function perform_rotation_event()
{
    if(CURRENT_PLANET_POSITIONS[SPACESHIP_POSITION[0]] == SPACESHIP_POSITION[1]){
        SPACESHIP_POSITION[1] = (SPACESHIP_POSITION[1] + 1) % PLANETS[SPACESHIP_POSITION[0]].length
    }
    for(let planet=0;planet<CURRENT_PLANET_POSITIONS.length;planet++){
        CURRENT_PLANET_POSITIONS[planet] = (CURRENT_PLANET_POSITIONS[planet] + 1) % PLANETS[planet].length
    }
    let markers = [TIME_SPENT, NEXT_PASSENGER_EVENT, END_EVENT]
    let stack_position = markers.filter(function(arr){return arr[0] == NEXT_ROTATE_EVENT[0] + 10}).length
    NEXT_ROTATE_EVENT = [
        NEXT_ROTATE_EVENT[0] + 10, 
        stack_position
    ]
    perform_next_turn()
}

function perform_end_event()
{
    throw new Error("You won.");
}

function handleClick(asd) {
    //TODO remove
    //alert('Clicked on the specified area!' + asd);
    console.log('Clicked on the specified area!' + asd)
    // You can replace the alert with your custom logic
}

function getImagePosition() {
    var image = document.getElementById('mainboard');
    var rect = image.getBoundingClientRect();
    PLANET_OFFSET[0] = rect.left
    PLANET_OFFSET[1] = rect.top
    MAINBOARD_OFFSET[0] = rect.left
    MAINBOARD_OFFSET[1] = rect.top + 140
    DRAWING_PILE_OFFSET[0] = rect.left + 701 + 35
    DRAWING_PILE_OFFSET[1] = rect.top + 140 + 25
    DISCARD_PILE_OFFSET[0] = rect.left + 701 + 35
    DISCARD_PILE_OFFSET[1] = rect.top + 140 + 75
    SHIP_OFFSET[0] = MAINBOARD_OFFSET[0] + 35
    SHIP_OFFSET[1] = MAINBOARD_OFFSET[1] + 496 + 35
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
    let container = document.getElementById("clickable_areas")
    for (let i = 0; i <= 74; i++) {
        let newDiv = document.createElement('div');
        let position = getPosition(i)
        newDiv.className = 'square';
        newDiv.id = 'TU_' + i
        newDiv.addEventListener('click', function(){
            onClickTimeSpace(i)});
        newDiv.style.left = position[0] + MAINBOARD_OFFSET[0] + 'px'
        newDiv.style.top = position[1] + MAINBOARD_OFFSET[1] + 'px'
        container.appendChild(newDiv);
      }
}

function createHexSpaces()
{
    let container = document.getElementById("clickable_areas")
    for(let planet=0;planet<PLANETS.length;planet++){
        for(let i=0;i<PLANETS[planet].length;i++){
            let newDiv = document.createElement('div');
            let position = PLANETS[planet][i]
            newDiv.className = 'hex';
            newDiv.id = 'Planet_' + planet + "_" + i
            newDiv.addEventListener('click', function(){
                onClickHex(planet, i)});
            newDiv.style.left = position[0] + MAINBOARD_OFFSET[0] + 'px'
            newDiv.style.top = position[1] + MAINBOARD_OFFSET[1] + 'px'
            container.appendChild(newDiv);
        }
    }
}

function createPlanetPassengers()
{
    let container = document.getElementById("clickable_areas")
    for(let planet=0;planet<6;planet++){
        for(let i=0;i<3;i++){
            let el = document.createElement('img');
            el.id = 'Passenger_' + i + '_Planet_' + planet
            el.style.width = "70px"
            el.style.display = 'none'
            el.addEventListener('click', function(){
                onClickPlanetPassenger(planet, i)});
            el.src = "pics/back.jpg"
            container.appendChild(el);
        }
    }
}

function moveTimeMarkers()
{
    var time_markers = [
        ['time_marker', TIME_SPENT],
        ['rotate_marker', NEXT_ROTATE_EVENT],
        ['passenger_marker', NEXT_PASSENGER_EVENT],
        ['end_marker', END_EVENT]
    ]
    time_markers.sort(function(l, r){
        if(l[1][0]<r[1][0] || (l[1][0]==r[1][0] && l[1][1]>r[1][1])){
            return -1
        }
        return 1
    })
    let marker_containter = document.getElementById("tu_markers");
    for(let marker=0;marker<time_markers.length;marker++)
    {
        let m = moveMarkerToTu(time_markers[marker][0], time_markers[marker][1])
        marker_containter.prepend(m);
    }
}

function moveMarkerToTu(marker_name, tu)
{
    var time_space = tu[0] % 75
    let time_marker = document.getElementById(marker_name);
    time_marker.style.left = MAINBOARD_OFFSET[0] + TU_POSITIONS[time_space][0] + TIME_MARKER_OFFSET[0] + 'px'
    time_marker.style.top = MAINBOARD_OFFSET[1] + TU_POSITIONS[time_space][1] - tu[1]*3 + TIME_MARKER_OFFSET[1] + 'px'
    time_marker.style.position = 'absolute';
    time_marker.style.display = 'block';
    return time_marker
}

function setup(seed, difficulty)
{
    HISTORY = []
    HISTORY.push({
        'seed': seed,
        'difficulty': difficulty
    })
    END_EVENT = [difficulty, 0]
    NEXT_TURN_TYPE = CHOOSE_STARTING_POSITION
    SPACESHIP_POSITION = []
    TIME_SPENT = [0,0]
    CURRENT_PLANET_POSITIONS = [0, 0, 0, 0, 0, 0]
    NEXT_ROTATE_EVENT = [10, 0]
    NEXT_PASSENGER_EVENT = [0, 0]
    PASSENGER_DECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    DISCARD_PILE = []
    PLANET_PASSENGERS = [[], [], [], [], [], []]
    SHIP_PASSENGERS = [0, 0, 0, 0]
    CURRENT_TURN = {}
    Math.seedrandom(seed);
    shuffle(PASSENGER_DECK);
    perform_passenger_event()
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
    el.style.left = position[0] + "px"
    el.style.top = position[1] + "px"
    el.style.position = 'absolute';
    el.style.display = 'block';
    return el
}

function setPositionFixedElements()
{
    for (let i = 0; i <= 74; i++) {
        let el = setPosition('TU_' + i, [TU_POSITIONS[i][0] + MAINBOARD_OFFSET[0], TU_POSITIONS[i][1] + MAINBOARD_OFFSET[1]])
        el.style.background = 'rgba(255, 0, 0, 0.1)'
    }
    if(CURRENT_TURN.hasOwnProperty('arrival_time')){
        let el = document.getElementById('TU_' + CURRENT_TURN['arrival_time']%75)
        el.style.background = 'red'
    }
    
    for(let planet=0;planet<PLANETS.length;planet++){
        for(let i=0;i<PLANETS[planet].length;i++){
            let el = setPosition('Planet_' + planet + "_" + i, [PLANETS[planet][i][0] + MAINBOARD_OFFSET[0], PLANETS[planet][i][1] + MAINBOARD_OFFSET[1]])
            el.style.background = 'rgba(255, 255, 255, 0.1)'
        }
        for(let i = 0; i<3;i++){
            let position = [
                PLANET_OFFSET[0] + 70 + planet*140,
                PLANET_OFFSET[1] + i*46
            ]
            passenger = setPosition('Passenger_' + i + '_Planet_' + planet, position)
            if(i<PLANET_PASSENGERS[planet].length){
                passenger.src = "pics/" + PLANET_PASSENGERS[planet][i] + ".png"
            }
            else
            {
                passenger.style.display = "none"
            }
        }
    }
    if(CURRENT_TURN.hasOwnProperty('destination')){
        const destination = CURRENT_TURN['destination']
        let el = document.getElementById('Planet_' + destination[0] + "_" + destination[1])
        el.style.background = 'red'
    }

    setPosition('drawing_pile', DRAWING_PILE_OFFSET)
    setPosition('discard_pile', DISCARD_PILE_OFFSET)

    for(let seat=1; seat<5; seat++)
    {
        let el = document.getElementById("marker_" + seat)
        el.style.position = 'absolute';
        el.style.display = 'block';
        var rect = el.getBoundingClientRect();
        el.style.left = SHIP_OFFSET[0] + (seat-1)*80 + 30 + "px"
        el.style.top = SHIP_OFFSET[1] - rect.height + "px"

        setPosition("seat_" + seat,
            [
                SHIP_OFFSET[0] + (seat-1)*80,
                SHIP_OFFSET[1] + 10
            ]
        )
    }

    setPosition('reset_turn', [DISCARD_PILE_OFFSET[0], SHIP_OFFSET[1]])
    setPosition('end_turn', [DISCARD_PILE_OFFSET[0], SHIP_OFFSET[1] + 50])
}

function makePlanetsClickable()
{
    let planet_markers = ['earth_marker', 'mars_marker', 'jupiter_marker', 'saturn_marker', 'uranus_marker', 'neptun_marker']
    for(let marker=0;marker<planet_markers.length;marker++){
        let el = document.getElementById(planet_markers[marker])
        el.addEventListener('click', function(){
            onClickPlanet(marker)})
    }
    
}
    

function refreshUI()
{
    getImagePosition()
    setPositionFixedElements()
    let planet_markers = ['earth_marker', 'mars_marker', 'jupiter_marker', 'saturn_marker', 'uranus_marker', 'neptun_marker']
    for(let marker=0;marker<planet_markers.length;marker++){
        setPosition(planet_markers[marker], 
            [
                PLANETS[marker][CURRENT_PLANET_POSITIONS[marker]][0] + MAINBOARD_OFFSET[0] + PLANET_POSITION_OFFSET[0],
                PLANETS[marker][CURRENT_PLANET_POSITIONS[marker]][1] + MAINBOARD_OFFSET[1] + PLANET_POSITION_OFFSET[1]
            ])
    }

    if(SPACESHIP_POSITION.length == 2){
        setPosition('ship_marker',
        [
            MAINBOARD_OFFSET[0] + PLANETS[SPACESHIP_POSITION[0]][SPACESHIP_POSITION[1]][0] + SHIP_POSITION_OFFSET[0],
            MAINBOARD_OFFSET[1] + PLANETS[SPACESHIP_POSITION[0]][SPACESHIP_POSITION[1]][1] + SHIP_POSITION_OFFSET[1]
        ])
    }
    
    let drawing_pile = document.getElementById('drawing_pile')
    if(PASSENGER_DECK.length == 0)
    {
        drawing_pile.src = "pics/empty.png"
    }
    else
    {
        drawing_pile.src = "pics/back.png"
    }

    let discard_pile = document.getElementById('discard_pile')
    if(DISCARD_PILE.length == 0)
    {
        discard_pile.src = "pics/empty.png"
    }
    else
    {
        discard_pile.src = "pics/" + DISCARD_PILE[DISCARD_PILE.length - 1] + ".png"
    }

    moveTimeMarkers()
}

function handleResize() {
    refreshUI()
}

// Call the function when the page is loaded
window.onload = function () {
    getImagePosition()
    createTimeSpaces()
    createHexSpaces()
    makePlanetsClickable()
    createPlanetPassengers()
    setup('holymoly', 120)
    refreshUI()
    setNextTurnType()
};
document.addEventListener('click', handleMouseClick);//TODO remove + remove handleMouseClick
window.addEventListener('resize', handleResize);
