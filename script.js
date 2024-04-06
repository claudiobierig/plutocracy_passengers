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
let SCALE = 1

const PLANET_MARKERS = ['earth_marker', 'mars_marker', 'jupiter_marker', 'saturn_marker', 'uranus_marker', 'neptun_marker']

const HELPER_TEXT_CHOOSE_STARTING_POSITION = `Pick your starting position by clicking on one of the planet positions.<br>
Afterwards click on the End Turn button.`
const HELPER_TEXT_PLAYER_TURN = `1) Pick up passengers.<br>
2) Choose a destination.<br>
3) If you want to spent additional TU, click on the corresponding space.`

let EVENT_LISTENERS_CREATED = false
let MOVE_KEYFRAME_COUNT = 0

/*
const EARTH_COORDS = [[0, -2], [0, 2]]
const MARS_COORDS = [[-3, 4], [-3, -1], [5, -2]]
const JUPITER_COORDS = [[1, 3], [-6, 5], [-5, 0], [3, -5], [7, -3]]
const SATURN_COORDS = [[-9, 5], [-6, -1], [2, -6], [7, -6], [8, -2], [2, 4], [-5, 7]]
const URANUS_COORDS = [[-9, 8], [-10, 3], [-5, -3], [2, -7], [8, -8], [11, -3], [8, 0], [2, 5], [-4, 8]]
const NEPTUN_COORDS = [[-11, 3], [-6, -3], [0, -7], [5, -9], [10, -9], [12, -4], [10, -1], [4, 5], [-2, 8], [-7, 9], [-11, 8]]

const COORDS = [EARTH_COORDS, MARS_COORDS, JUPITER_COORDS, SATURN_COORDS, URANUS_COORDS, NEPTUN_COORDS]

function getDistance(a, b)
{
    let c = -a[0] -a[1]
    let d = -b[0] -b[1]
    return Math.max(
        Math.abs(a[0] - b[0]) + 
        Math.abs(a[1] - b[1]) +
        Math.abs(c-d)//Math.abs(-a[0] - a[1] + b[0] + b[1])
    )/2 + 2
}

function computeDistances()
{
    let distances = []
    for(let planet=0;planet<COORDS.length;planet++){
        distances.push([])
        for(let position=0;position<COORDS[planet].length;position++){
            distances[planet].push([])
            const current_position = COORDS[planet][position]
            for(let planet2=0;planet2<COORDS.length;planet2++){
                distances[planet][position].push([])
                for(let position2=0;position2<COORDS[planet2].length;position2++){
                    distances[planet][position][planet2].push(getDistance(current_position, COORDS[planet2][position2]))
                }
            }
        }
    }
    return distances
}

let DISTANCES = computeDistances()
//special treatment for earth <-> earth and earth 0 <-> jupiter 0 due to sun
DISTANCES[0][0][0][1] = 8
DISTANCES[0][1][0][0] = 8
DISTANCES[0][0][2][0] = 9
DISTANCES[2][0][0][0] = 9
*/

const DISTANCES = [[[[2,8],[8,5,7],[9,9,7,5,9],[11,8,6,9,10,10,11],[12,12,8,7,10,13,12,11,12],[13,9,7,9,12,14,13,13,12,13,13]],[[8,2],[5,8,7],[4,8,9,9,9],[11,11,10,10,10,6,7],[11,12,12,11,12,13,10,7,8],[13,13,11,13,13,14,12,9,8,9,13]]],[[[8,5],[2,7,10],[6,5,8,11,12],[8,10,12,12,13,7,5],[8,10,11,13,14,16,13,8,6],[11,12,13,15,15,17,15,10,7,7,10]],[[5,8],[7,2,10],[10,8,4,8,12],[8,5,7,12,13,12,10],[11,9,6,8,13,16,14,13,11],[10,7,8,10,15,17,15,15,12,12,11]],[[7,7],[10,10,2],[7,13,12,7,4],[16,13,9,6,5,8,12],[16,17,13,10,8,8,7,9,12],[18,14,12,9,9,9,8,9,12,14,18]]],[[[9,4],[6,10,7],[2,9,11,10,8],[12,13,11,11,9,4,8],[12,13,14,12,13,12,9,5,7],[14,15,13,14,14,13,11,7,7,10,14]],[[9,8],[5,8,13],[9,2,7,12,15],[5,8,13,15,16,10,5],[5,8,10,14,16,19,16,10,7],[9,10,14,16,18,20,18,12,9,6,7]],[[7,9],[8,4,12],[11,7,2,10,14],[7,4,9,14,15,13,9],[10,7,5,9,15,18,15,14,11],[8,6,9,12,17,19,17,16,13,11,10]],[[5,9],[11,8,7],[10,12,10,2,8],[14,11,4,6,10,11,14],[15,15,10,5,7,12,12,12,15],[16,11,7,6,9,12,13,13,15,16,16]],[[9,9],[12,12,4],[8,15,14,8,2],[18,15,10,5,4,9,14],[18,19,14,11,7,6,6,10,13],[20,15,13,10,8,7,7,10,13,16,20]]],[[[11,11],[8,8,16],[12,5,7,14,18],[2,8,13,18,19,13,8],[5,5,10,14,19,22,19,13,10],[6,10,14,16,21,23,21,15,12,8,5]],[[8,11],[10,5,13],[13,8,4,11,15],[8,2,10,15,16,15,11],[11,6,4,10,16,19,17,16,13],[7,4,8,13,18,20,18,18,15,12,11]],[[6,10],[12,7,9],[11,13,9,4,10],[13,10,2,7,12,12,15],[16,14,9,3,8,14,14,13,16],[15,10,5,5,10,14,15,15,16,17,16]],[[9,10],[12,12,6],[11,15,14,6,5],[18,15,7,2,7,12,15],[18,19,14,8,4,9,9,13,16],[20,15,10,7,5,9,10,13,16,17,20]],[[10,10],[13,13,5],[9,16,15,10,4],[19,16,12,7,2,8,15],[19,20,16,13,8,5,4,9,14],[21,17,15,12,9,6,5,9,12,17,21]],[[10,6],[7,12,8],[4,10,13,11,9],[13,15,12,12,8,2,9],[13,15,16,13,14,11,8,3,8],[16,17,15,15,15,12,10,5,6,11,15]],[[11,7],[5,10,12],[8,5,9,14,14],[8,11,15,15,15,9,2],[6,11,12,16,17,18,15,9,4],[12,13,16,18,18,19,17,11,6,4,8]]],[[[12,11],[8,11,16],[12,5,10,15,18],[5,11,16,18,19,13,6],[2,8,13,17,19,22,19,13,7],[9,13,17,19,21,23,21,15,9,5,4]],[[12,12],[10,9,17],[13,8,7,15,19],[5,6,14,19,20,15,11],[8,2,8,14,20,23,20,16,13],[3,8,12,17,22,24,22,18,15,11,7]],[[8,12],[11,6,13],[14,10,5,10,14],[10,4,9,14,16,16,12],[13,8,2,9,15,18,18,17,14],[8,3,7,12,17,19,19,19,16,14,13]],[[7,11],[13,8,10],[12,14,9,5,11],[14,10,3,8,13,13,16],[17,14,9,2,8,15,15,14,17],[15,10,4,5,10,15,16,16,17,18,17]],[[10,12],[14,13,8],[13,16,15,7,7],[19,16,8,4,8,14,17],[19,20,15,8,2,10,10,15,18],[21,16,10,6,4,10,11,15,18,19,21]],[[13,13],[16,16,8],[12,19,18,12,6],[22,19,14,9,5,11,18],[22,23,18,15,10,2,5,11,17],[24,19,17,14,9,3,4,10,15,20,24]],[[12,10],[13,14,7],[9,16,15,12,6],[19,17,14,9,4,8,15],[19,20,18,15,10,5,2,8,14],[21,19,17,14,11,6,4,7,12,17,21]],[[11,7],[8,13,9],[5,10,14,12,10],[13,16,13,13,9,3,9],[13,16,17,14,15,11,8,2,8],[17,18,16,16,16,12,10,4,6,11,15]],[[12,8],[6,11,12],[7,7,11,15,13],[10,13,16,16,14,8,4],[7,13,14,17,18,17,14,8,2],[14,15,17,19,19,18,16,10,4,5,9]]],[[[13,13],[11,10,18],[14,9,8,16,20],[6,7,15,20,21,16,12],[9,3,8,15,21,24,21,17,14],[2,8,13,18,23,25,23,19,16,12,7]],[[9,13],[12,7,14],[15,10,6,11,15],[10,4,10,15,17,17,13],[13,8,3,10,16,19,19,18,15],[8,2,8,13,18,20,20,20,17,14,13]],[[7,11],[13,8,12],[13,14,9,7,13],[14,8,5,10,15,15,16],[17,12,7,4,10,17,17,16,17],[13,8,2,7,12,17,18,18,17,18,17]],[[9,13],[15,10,9],[14,16,12,6,10],[16,13,5,7,12,15,18],[19,17,12,5,6,14,14,16,19],[18,13,7,2,7,14,15,16,19,20,19]],[[12,13],[15,15,9],[14,18,17,9,8],[21,18,10,5,9,15,18],[21,22,17,10,4,9,11,16,19],[23,18,12,7,2,9,10,16,19,20,23]],[[14,14],[17,17,9],[13,20,19,12,7],[23,20,14,9,6,12,19],[23,24,19,15,10,3,6,12,18],[25,20,17,14,9,2,5,11,16,21,25]],[[13,12],[15,15,8],[11,18,17,13,7],[21,18,15,10,5,10,17],[21,22,19,16,11,4,4,10,16],[23,20,18,15,10,5,2,8,14,19,23]],[[13,9],[10,15,9],[7,12,16,13,10],[15,18,15,13,9,5,11],[15,18,19,16,15,10,7,4,10],[19,20,18,16,16,11,8,2,8,13,17]],[[12,8],[7,12,12],[7,9,13,15,13],[12,15,16,16,12,6,6],[9,15,16,17,18,15,12,6,4],[16,17,17,19,19,16,14,8,2,7,11]],[[13,9],[7,12,14],[10,6,11,16,16],[8,12,17,17,17,11,4],[5,11,14,18,19,20,17,11,5],[12,14,18,20,20,21,19,13,7,2,7]],[[13,13],[10,11,18],[14,7,10,16,20],[5,11,16,20,21,15,8],[4,7,13,17,21,24,21,15,9],[7,13,17,19,23,25,23,17,11,7,2]]]]


let MAINBOARD_OFFSET = [10, 10]
let DRAWING_PILE_OFFSET = [0, 0]
let DISCARD_PILE_OFFSET = [0, 0]
let PLANET_OFFSET = [425, 0]
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
let ANIMATIONS_TO_BE_PERFORMED = []

function onClickTimeSpace(tu)
{
    if(NEXT_TURN_TYPE != PLAYER_TURN){
        return 0
    }
    if(!CURRENT_TURN.hasOwnProperty('destination'))
    {
        return 1
    }
    let minimal_time = TIME_SPENT[0]
    if(CURRENT_TURN.hasOwnProperty('destination')){
        minimal_time += DISTANCES[SPACESHIP_POSITION[0]][SPACESHIP_POSITION[1]][CURRENT_TURN['destination'][0]][CURRENT_TURN['destination'][1]]
    }
    let arrival_time = tu
    while(arrival_time < minimal_time){
        arrival_time += 75
    }
    CURRENT_TURN['arrival_time'] = arrival_time
    refreshUI()
    return arrival_time
}

function onClickPlanet(planet){
    onClickHex(planet, CURRENT_PLANET_POSITIONS[planet])
}

function onClickHex(planet, number)
{
    if(NEXT_TURN_TYPE == PLAYER_TURN){
        if(SPACESHIP_POSITION[0] == planet && SPACESHIP_POSITION[1] == number){
            return
        }
        CURRENT_TURN['destination'] = [planet, number]
        CURRENT_TURN['arrival_time'] = TIME_SPENT[0] + DISTANCES[SPACESHIP_POSITION[0]][SPACESHIP_POSITION[1]][planet][number]
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
            setHelperText(HELPER_TEXT_PLAYER_TURN)
        }
    }
    else if(NEXT_TURN_TYPE==PLAYER_TURN)
    {
        if(CURRENT_TURN.hasOwnProperty('destination'))
        {
            if(CURRENT_TURN.hasOwnProperty('pick_up'))
            {
                let animation = {
                    "type": "pickup_passenger",
                    "passengers": CURRENT_TURN['pick_up'],
                    "planet": SPACESHIP_POSITION[0],
                    "planet_passengers_before": PLANET_PASSENGERS[SPACESHIP_POSITION[0]],
                    "planet_passengers_after": []
                }
                for(let p=0; p <CURRENT_TURN['pick_up'].length; p++)
                {
                    SHIP_PASSENGERS[CURRENT_TURN['pick_up'][p][1]] = PLANET_PASSENGERS[SPACESHIP_POSITION[0]][CURRENT_TURN['pick_up'][p][0]]
                    PLANET_PASSENGERS[SPACESHIP_POSITION[0]][CURRENT_TURN['pick_up'][p][0]] = 0
                }
                
                let new_passengers = PLANET_PASSENGERS[SPACESHIP_POSITION[0]].filter(function(p){
                    return p != 0
                })
                PLANET_PASSENGERS[SPACESHIP_POSITION[0]] = new_passengers
                animation["planet_passengers_after"] = PLANET_PASSENGERS[SPACESHIP_POSITION[0]]
                ANIMATIONS_TO_BE_PERFORMED.push(animation)
            }

            let tu_animation = {
                "type": "MOVE",
                "element_id": ["time_marker"],
                "current_position": [getPositionOfTuMarker(TIME_SPENT)],
                "next_position": []
            }
            let markers = [NEXT_ROTATE_EVENT, NEXT_PASSENGER_EVENT, END_EVENT]
            let stack_position = markers.filter(function(arr){return arr[0] == CURRENT_TURN['arrival_time']}).length
            TIME_SPENT = [
                CURRENT_TURN['arrival_time'], 
                stack_position
            ]
            tu_animation["next_position"].push(getPositionOfTuMarker(TIME_SPENT))
            ANIMATIONS_TO_BE_PERFORMED.push(tu_animation)

            let spaceship_animation = {
                "type": "MOVE",
                "element_id": ["ship_marker"],
                "current_position": [getShipPosition(SPACESHIP_POSITION)],
                "next_position": [getShipPosition(CURRENT_TURN['destination'])]
            }
            ANIMATIONS_TO_BE_PERFORMED.push(spaceship_animation)
            SPACESHIP_POSITION = CURRENT_TURN['destination']

        //TODO: else warning
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

function new_game()
{
    let difficulty = parseInt(document.getElementById('Difficulty').value);
    let starting_position = document.getElementById('StartPosition').value;
    let seed = Date.now()
    if(document.getElementById('fixSeed').checked){
        seed = document.getElementById('seedInput').value;
    }
    setup(seed, difficulty, starting_position)
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
    try{
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
        else if(NEXT_TURN_TYPE == PLAYER_TURN)
        {
            perform_player_turn()
        }
    }
    catch(error)
    {
        let el = document.getElementById('new_game_result')
        el.innerHTML = error.message
        el.style.display = 'block';
        $('#new_game_modal').modal('show');
    }
}

function setHelperText(message)
{
    let helper_div = document.getElementById("helper_text");
    helper_div.innerHTML = message
}

function passenger_is_first_class(passenger){
    return (passenger%3) == 1
}

function passenger_is_for_planet(passenger, planet){
    return planet*3 < passenger && passenger <= (planet+1)*3
}

function freeSeatAvailable(passenger)
{
    if(passenger_is_first_class(passenger)){
        return SHIP_PASSENGERS[0] == 0 || SHIP_PASSENGERS[1] == 0
    }
    return SHIP_PASSENGERS.some(function(p){return p==0})
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
            ANIMATIONS_TO_BE_PERFORMED.push(
                {
                    "type": "all_passengers_for_planet",
                    "planet": planet
                }
            )
            return 0
        }
        PASSENGER_DECK = DISCARD_PILE
        DISCARD_PILE = []
        ANIMATIONS_TO_BE_PERFORMED.push(
            {
                "type": "flip_discard_pile",
                "cardsLeftInPassengerDeck": PASSENGER_DECK.length,
                "cardsOnDiscardPile": DISCARD_PILE.length
            }
        )
        shuffle(PASSENGER_DECK)
        ANIMATIONS_TO_BE_PERFORMED.push(
            {"type": "shuffle"}
        )
    }
    passenger = PASSENGER_DECK.pop()
    if(passenger_is_for_planet(passenger, planet)){
        DISCARD_PILE.push(passenger)
        ANIMATIONS_TO_BE_PERFORMED.push(
            {
                "type": "draw_passenger_discard_pile",
                "passenger": passenger,
                "cardsLeftInPassengerDeck": PASSENGER_DECK.length,
                "cardsOnDiscardPile": DISCARD_PILE.length
            }
        )
        return draw_passenger(planet)
    }
    return passenger    
}

function perform_passenger_event()
{
    if(NEXT_TURN_TYPE != CHOOSE_STARTING_POSITION)
    {
        const current_position = getPositionOfTuMarker(NEXT_PASSENGER_EVENT)
        let markers = [TIME_SPENT, NEXT_ROTATE_EVENT, END_EVENT]
        let stack_position = markers.filter(function(arr){return arr[0] == NEXT_PASSENGER_EVENT[0] + 20}).length
        NEXT_PASSENGER_EVENT = [
            NEXT_PASSENGER_EVENT[0] + 20, 
            stack_position
        ]
        const next_position = getPositionOfTuMarker(NEXT_PASSENGER_EVENT)
        let animation = {
            "type": "MOVE",
            "element_id": ["passenger_marker"],
            "current_position": [current_position],
            "next_position": [next_position]
        }
        ANIMATIONS_TO_BE_PERFORMED.push(animation)
    }

    for(let planet=0;planet<CURRENT_PLANET_POSITIONS.length;planet++){
        if(PLANET_PASSENGERS[planet].length >=3)
        {
            throw new Error("You loose. Already 3 passengers at "+ planet);
        }
        passenger = draw_passenger(planet)
        if(passenger != 0){
            ANIMATIONS_TO_BE_PERFORMED.push(
                {
                    "type": "draw_passenger",
                    "planet": planet,
                    "passenger": passenger,
                    "planet_position": PLANET_PASSENGERS[planet].length,
                    "cardsLeftInPassengerDeck": PASSENGER_DECK.length
                }
            )
            PLANET_PASSENGERS[planet].push(passenger)
        }
    }
    perform_next_turn()
}

function insertMoveAnimation(name_of_animation, current_position, next_position)
{
    const dynamicKeyframes = document.getElementById('dynamicKeyframes');
    const keyframe = `
    @keyframes ${name_of_animation} {
        0% {
        transform: translate(0, 0);
        }
        100% {
        transform: translate(${next_position[0] - current_position[0]}px, ${next_position[1] - current_position[1]}px);
        }
    }
    `;
    dynamicKeyframes.sheet.insertRule(keyframe, 0);
}

function cleanKeyframes()
{
    const dynamicKeyframes = document.getElementById('dynamicKeyframes');
    while (dynamicKeyframes.sheet.cssRules.length) {
        dynamicKeyframes.sheet.deleteRule(0);
    }
    MOVE_KEYFRAME_COUNT = 0
}

function move(element_id, current_position, next_position, onAnimationEnd)
{
    
    const keyframe_name = "MOVE_" + MOVE_KEYFRAME_COUNT
    MOVE_KEYFRAME_COUNT = MOVE_KEYFRAME_COUNT + 1
    insertMoveAnimation(keyframe_name, current_position, next_position)
    const animatedImage = document.getElementById(element_id)
    animatedImage.style.animation = keyframe_name + ' 1s ease-in-out forwards'
    const animationEndHandler = () => {
        const animatedImage = document.getElementById(element_id);
        animatedImage.removeEventListener('animationend', animationEndHandler);
        animatedImage.style.animation = '';
        animatedImage.style.left = next_position[0] + "px"
        animatedImage.style.top = next_position[1] + "px"
        onAnimationEnd()
    }
    animatedImage.addEventListener('animationend', animationEndHandler);
}

function moveMultipleElements(element_ids, current_positions, next_positions, onAnimationEnd)
{
    for(let i=0;i<element_ids.length;i++){
        move(
            element_ids[i],
            current_positions[i],
            next_positions[i],
            () => {
                if(i==0){
                    onAnimationEnd()
                }
            }
        )
    }
}

function animateShuffle()
{
    let drawing_pile = document.getElementById("drawing_pile")
    drawing_pile.style.animation = 'shuffleAnimation 3s ease-in-out'
    const animationEndHandler = () => {
            
        const animatedImage = document.getElementById("drawing_pile");
        animatedImage.removeEventListener('animationend', animationEndHandler);
        animatedImage.style.animation = '';
        
        refreshUI()
    }
    drawing_pile.addEventListener('animationend', animationEndHandler);
}

function perform_animation()
{
    let animation = ANIMATIONS_TO_BE_PERFORMED.shift()
    console.log(animation["type"])
    if(animation["type"] == "MOVE"){
        moveMultipleElements(animation["element_id"], animation["current_position"], animation["next_position"], refreshUI)
        return
    }
    else if(animation["type"] == "shuffle")
    {
        animateShuffle()
    }
    else if(animation["type"] == "draw_passenger")
    {
        const card_name = "draw_passenger_" + animation["passenger"]
        createFlippableCard(DRAWING_PILE_OFFSET, animation["passenger"], card_name, () => {
            const passenger_element = document.getElementById('Passenger_' + animation["planet_position"] + '_Planet_' + animation["planet"])
            let next_position = [parseFloat(passenger_element.style.left), parseFloat(passenger_element.style.top)]
            move(card_name, DRAWING_PILE_OFFSET, next_position, () => {
                passenger_element.src = "pics/" + animation["passenger"] + ".png"
                passenger_element.style.display = 'block';
                passenger_element.style.opacity = 1
                let card = document.getElementById(card_name)
                card.remove()
                refreshUI() 
            })
        })
        updatePassengerDeck(animation["cardsLeftInPassengerDeck"])
        setTimeout(()=>{flipCard(card_name)}, 1);
        
    }
    else if(animation["type"] == "draw_passenger_discard_pile")
    {
        const card_name = "draw_passenger_" + animation["passenger"]
        createFlippableCard(DRAWING_PILE_OFFSET, animation["passenger"], card_name, () => {
            move(card_name, DRAWING_PILE_OFFSET, DISCARD_PILE_OFFSET, () => {
                updateDiscardPile(animation["cardsOnDiscardPile"], animation["passenger"])
                let card = document.getElementById(card_name)
                card.remove()
                refreshUI()
            })
        })
        updatePassengerDeck(animation["cardsLeftInPassengerDeck"])
        setTimeout(()=>{flipCard(card_name)}, 1);
    }
    else if(animation["type"] == "pickup_passenger")
    {
        /*
        let animation = {
                    "type": "pickup_passenger",
                    "passengers": CURRENT_TURN['pick_up'],
                    "planet": SPACESHIP_POSITION[0],
                    "planet_passengers_before": PLANET_PASSENGERS[SPACESHIP_POSITION[0]],
                    "planet_passengers_after": PLANET_PASSENGERS[SPACESHIP_POSITION[0]]
                }
                */
        
        //create movable image atop of each seat that gets picked up
        //set below image to transparent
        
        //move all to correct seats

        //update seats
        for(let i=0;i<4; i++){
            let el = document.getElementById("seat_" + i + "_container")
            el.classList = ["full"]
        }
        //remove images

        //update planet:

        //create movable images atop on left over passengers
        //set all to transparent
        
        //move images to correct spot
        
        //update spots below
        for(let i=0;i<3;i++){
            let el = document.getElementById('Passenger_' + i + '_Planet_' + animation["planet"])
            let planet_passengers_after = animation["planet_passengers_before"].filter(function(p){
                return p != 0
            })
            if(i<planet_passengers_after.length){
                el.src = "pics/" + planet_passengers_after[i] + ".png"
                el.style.opacity = 1
            }
            else{
                el.src = "pics/0.png"
                el.style.display = "none"
            }
        }

        //remove new images
        console.log(animation)
        refreshUI()
    }
    else if(animation["type"] == "drop_of_passenger")
    {
        /*
        const animation = {
            "type": "drop_of_passenger",
            "seats": [],
            "cardsOnDiscardPile": 0,
            "passengerOnDiscardPile": 0
        }
        */
        //create movable image atop of each seat that gets droped of
        //correct ordering, so that the top one stays on top
        //set below image to 0
        for(let i=0; i< animation["seats"].length; i++){
            let el = document.getElementById("seat_" + i)
            el.src = "pics/0.png"
        }

        //move all images to discard pile

        //update discard pile
        updateDiscardPile(animation["cardsOnDiscardPile"], animation["passengerOnDiscardPile"])
        //remove moving images
        
        console.log(animation)
        refreshUI()
    }
    else if(animation["type"] == "all_passengers_for_planet")
    {
        refreshUI()
    }
    else if(animation["type"] == "flip_discard_pile")
    {
        updatePassengerDeck(animation["cardsLeftInPassengerDeck"])
        updateDiscardPile(animation["cardsOnDiscardPile"], "0")
        refreshUI()
    }
    else
    {
        //Not implement yet
        refreshUI()
    }
}

function perform_rotation_event()
{
    const current_position = getPositionOfTuMarker(NEXT_ROTATE_EVENT)
    let markers = [TIME_SPENT, NEXT_PASSENGER_EVENT, END_EVENT]
    let stack_position = markers.filter(function(arr){return arr[0] == NEXT_ROTATE_EVENT[0] + 10}).length
    NEXT_ROTATE_EVENT = [
        NEXT_ROTATE_EVENT[0] + 10, 
        stack_position
    ]
    const next_position = getPositionOfTuMarker(NEXT_ROTATE_EVENT)
    let animation = {
        "type": "MOVE",
        "element_id": ["rotate_marker"],
        "current_position": [current_position],
        "next_position": [next_position]
    }
    ANIMATIONS_TO_BE_PERFORMED.push(animation)

    for(let planet=0;planet<CURRENT_PLANET_POSITIONS.length;planet++){
        animation = {
            "type": "MOVE",
            "element_id": [],
            "current_position": [],
            "next_position": []
        }
        
        if(planet == SPACESHIP_POSITION[0] && CURRENT_PLANET_POSITIONS[SPACESHIP_POSITION[0]] == SPACESHIP_POSITION[1]){
            animation["element_id"].push("ship_marker")
            animation["current_position"].push(getShipPosition(SPACESHIP_POSITION))
            SPACESHIP_POSITION[1] = (SPACESHIP_POSITION[1] + 1) % PLANETS[SPACESHIP_POSITION[0]].length
            animation["next_position"].push(getShipPosition(SPACESHIP_POSITION))
        }
        animation["element_id"].push(PLANET_MARKERS[planet])
        animation["current_position"].push(getPlanetPosition(planet, CURRENT_PLANET_POSITIONS[planet]))
        CURRENT_PLANET_POSITIONS[planet] = (CURRENT_PLANET_POSITIONS[planet] + 1) % PLANETS[planet].length
        animation["next_position"].push(getPlanetPosition(planet, CURRENT_PLANET_POSITIONS[planet]))
        ANIMATIONS_TO_BE_PERFORMED.push(animation)
    }
    perform_next_turn()
}

function perform_end_event()
{
    throw new Error("You won.");
}

function perform_player_turn()
{
    //only drop of passengers, rest will be done by player
    const planet = SPACESHIP_POSITION[0]
    if(CURRENT_PLANET_POSITIONS[planet] == SPACESHIP_POSITION[1]){
        const animation = {
            "type": "drop_of_passenger",
            "seats": [],
            "cardsOnDiscardPile": 0,
            "passengerOnDiscardPile": 0
        }
        for(let seat = 0; seat < SHIP_PASSENGERS.length; seat++)
        {
            const passenger = SHIP_PASSENGERS[seat]
            if(passenger_is_for_planet(passenger, planet)){
                animation["seats"].push(seat)
                DISCARD_PILE.push(passenger)
                SHIP_PASSENGERS[seat] = 0
                animation["passengerOnDiscardPile"] = passenger
            }
        }
        animation["cardsOnDiscardPile"] = DISCARD_PILE.length
        ANIMATIONS_TO_BE_PERFORMED.push(animation)
    }
}

function getImagePosition() {
    //var image = document.getElementById('mainboard');
    var rect = {
        "left": 0,
        "top": 0
    } //image.getBoundingClientRect();
    PLANET_OFFSET[0] = rect.left + 710
    PLANET_OFFSET[1] = rect.top + 2
    MAINBOARD_OFFSET[0] = rect.left
    MAINBOARD_OFFSET[1] = rect.top

    
    SHIP_OFFSET[0] = PLANET_OFFSET[0] + 10
    SHIP_OFFSET[1] = PLANET_OFFSET[1] + 350
    DRAWING_PILE_OFFSET[0] = SHIP_OFFSET[0] + 340
    DRAWING_PILE_OFFSET[1] = SHIP_OFFSET[1] - 46
    DISCARD_PILE_OFFSET[0] = DRAWING_PILE_OFFSET[0]
    DISCARD_PILE_OFFSET[1] = DRAWING_PILE_OFFSET[1] + 46 + 10
}

function getPosition(time_spent)
{
    var time_space = time_spent % 75
    return [TU_POSITIONS[time_space][0]*SCALE, TU_POSITIONS[time_space][1]*SCALE]
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
        if(!EVENT_LISTENERS_CREATED){
            newDiv.addEventListener('click', function(){
                onClickTimeSpace(i)});
        }
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
            if(!EVENT_LISTENERS_CREATED){
                newDiv.addEventListener('click', function(){
                    onClickHex(planet, i)});
            }
            newDiv.style.left = position[0]*SCALE + MAINBOARD_OFFSET[0] + 'px'
            newDiv.style.top = position[1]*SCALE + MAINBOARD_OFFSET[1] + 'px'
            container.appendChild(newDiv);
            let newDiv2 = document.createElement('div');
            let position2 = [PLANETS[planet][i][0] - 5, PLANETS[planet][i][1] -5]
            newDiv2.className = 'circle-background-small';
            newDiv2.id = 'Planet_' + planet + "_" + i + "_distance"
            newDiv2.innerHTML = "0"
            newDiv2.style.left = position2[0]*SCALE + MAINBOARD_OFFSET[0] + 'px'
            newDiv2.style.top = position2[1]*SCALE + MAINBOARD_OFFSET[1] + 'px'
            newDiv2.style.position = "absolute"
            container.appendChild(newDiv2);
        }
    }
}

function createFlippableCard(position, passenger, id, onTransitionEnd)
{
    let card = document.createElement('div');
    card.id = id
    card.className = 'card'
    card.style.left = position[0] + "px"
    card.style.top = position[1] + "px"
    card.style.display = "block"
    let container = document.getElementById("animation_container")
    container.appendChild(card)
    let card_inner = document.createElement('div');
    card_inner.id = "inner_" + id
    card_inner.className = 'card-inner'
    card_inner.addEventListener('transitionend', onTransitionEnd);
    card.appendChild(card_inner)
    let card_front = document.createElement('div')
    card_front.className = 'card-front'
    card_inner.appendChild(card_front)
    let front_image = document.createElement('img')
    front_image.src = "pics/back.png"
    card_front.appendChild(front_image)
    let card_back = document.createElement('div')
    card_back.className = 'card-back'
    card_inner.appendChild(card_back)
    let back_image = document.createElement('img')
    back_image.src = "pics/" + passenger + ".png"
    card_back.appendChild(back_image)
    return card
}

function flipCard(el_id)
{
    let card = document.getElementById(el_id)
    card.classList.toggle('flipped')
}

function updatePassengerDeck(cardsLeftInPassengerDeck)
{
    let drawing_pile = document.getElementById("drawing_pile")
    if(cardsLeftInPassengerDeck == 0)
    {
        
        drawing_pile.src = "pics/0.png"
        drawing_pile.style.display = "none"
    }
    else
    {
        drawing_pile.src = "pics/back.png"
        drawing_pile.style.display = "block"
    }
    let drawing_pile_size = document.getElementById("drawing_pile_size")
    drawing_pile_size.textContent = cardsLeftInPassengerDeck
}

function updateDiscardPile(cardsOnDiscardPile, passenger){
    let discard_pile = document.getElementById('discard_pile')
    if(cardsOnDiscardPile == 0)
    {
        discard_pile.src = "pics/0.png"
        discard_pile.style.display = "none"
    }
    else
    {
        discard_pile.src = "pics/" + passenger + ".png"
        discard_pile.style.display = 'block';
    }
    let discard_pile_size = document.getElementById('discard_pile_size')
    discard_pile_size.textContent = cardsOnDiscardPile
}

function drag(ev, planet, i){
    if(canTakeUpPassenger(planet, i)){
        ev.dataTransfer.setData("text", JSON.stringify([planet, i]))
        //let dragElement = document.getElementById('Passenger_' + i + '_Planet_' + planet)
        //dragElement.style.borderColor = "red"
        //dragElement.style.border = "solid"
        //ev.dataTransfer.setDragImage(dragElement, 0, 0)
    }
}

function canTakeUpPassenger(planet, number){
    if(NEXT_TURN_TYPE != PLAYER_TURN){
        return false
    }
    if(SPACESHIP_POSITION[0] != planet){
        return false
    }
    if(CURRENT_PLANET_POSITIONS[planet] != SPACESHIP_POSITION[1]){
        return false
    }
    if(number >= PLANET_PASSENGERS[planet].length)
    {
        return false
    }
    const passenger = PLANET_PASSENGERS[planet][number]
    if(!freeSeatAvailable(passenger)){
        return false
    }
    return true
}

function drop(ev){
    var data = ev.dataTransfer.getData("text");
    try{
        const dragged_passenger = JSON.parse(data);
    
        const planet = dragged_passenger[0]
        const number = dragged_passenger[1]

        if(!canTakeUpPassenger(planet, number)){
            return
        }

        //by name convention
        let seat = ev.target.id[5]
        if(SHIP_PASSENGERS[seat] != 0){
            return
        }
        const passenger = PLANET_PASSENGERS[planet][number]
        if(passenger_is_first_class(passenger) && seat > 1)
        {
            return
        }
        if(! CURRENT_TURN.hasOwnProperty('pick_up')){
            CURRENT_TURN['pick_up'] = []
        }
        for(let p=0; p<CURRENT_TURN['pick_up'].length; p++){
            if(CURRENT_TURN['pick_up'][p][0] == number)
            {
                CURRENT_TURN['pick_up'].splice(p, 1)
                break
            }
        }
        for(let p=0; p<CURRENT_TURN['pick_up'].length; p++){
            if(CURRENT_TURN['pick_up'][p][1] == seat)
            {
                CURRENT_TURN['pick_up'].splice(p, 1)
                break
            }
        }
        CURRENT_TURN['pick_up'].push([number, seat])
    }
    catch(error)
    {
        return
    }
    refreshUI()
} 

function allowDrop(ev){
    ev.preventDefault();
}

function createPlanetPassengers()
{
    let container = document.getElementById("clickable_areas")
    for(let planet=0;planet<6;planet++){
        for(let i=0;i<3;i++){
            let el = document.createElement('img');
            el.id = 'Passenger_' + i + '_Planet_' + planet
            el.style.width = SCALE*70 + "px" //TODO scale
            el.style.display = 'none'
            el.draggable = true
            if(!EVENT_LISTENERS_CREATED){
                el.addEventListener("dragstart", function(event){
                    drag(event, planet, i)
                })
            }
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

function getPositionOfTuMarker(tu)
{
    let time_space = tu[0] % 75
    return [
        MAINBOARD_OFFSET[0] + TU_POSITIONS[time_space][0]*SCALE + TIME_MARKER_OFFSET[0]*SCALE,
        MAINBOARD_OFFSET[1] + TU_POSITIONS[time_space][1]*SCALE - tu[1]*3*SCALE + TIME_MARKER_OFFSET[1]*SCALE
    ]
}

function moveMarkerToTu(marker_name, tu)
{
    let position = getPositionOfTuMarker(tu)
    let time_marker = document.getElementById(marker_name);
    time_marker.style.left = position[0] + 'px'
    time_marker.style.top = position[1] + 'px'
    time_marker.style.position = 'absolute';
    time_marker.style.display = 'block';
    return time_marker
}

function get_starting_planet_positions(starting_position)
{
    const options = {
        'Standard': [0, 0, 0, 0, 0, 0],
        'Mission Impossible': [0, 2, 3, 5, 4, 10],
        'Ueberholmanoever': [1, 2, 4, 6, 0, 10],
        'SehrSpaeteSchlange': [0, 0, 2, 5, 1, 2],
        'Schlange': [0, 1, 2, 1, 2, 1],
        'gamma/y': [1, 1, 3, 5, 2, 3],
        'Carina': [0, 0, 2, 6, 1, 4],
        'Ursa Major': [0, 2, 3, 3, 2, 0],
        'Ophiuchus': [1, 0, 4, 1, 4, 2],
        'Perseus': [1, 2, 3, 2, 7, 7],
        'Cygnus': [1, 0, 2, 3, 7, 7],
        'Pegasus': [1, 0, 1, 4, 7, 8],
        'Canis Major': [1, 0, 0, 2, 4, 4],
        'Auriga': [0, 1, 3, 6, 6, 7],
        'Leo': [1, 0, 0, 6, 4, 5],
        'Vela': [1, 0, 0, 6, 3, 4],
        'Orion': [0, 1, 0, 6, 2, 3]
    }

    if(options.hasOwnProperty(starting_position)){
        return options[starting_position]
    }
    let planet_positions = []
    for(let planet=0; planet<PLANETS.length; planet++){
        planet_positions.push((Math.floor(Math.random() * 12) + 1) % PLANETS[planet].length)
    }
    return planet_positions
}

function setup(seed, difficulty, starting_position)
{
    Math.seedrandom(seed);
    CURRENT_PLANET_POSITIONS = get_starting_planet_positions(starting_position)
    HISTORY = []
    HISTORY.push({
        'seed': seed,
        'difficulty': difficulty,
        'starting_position': CURRENT_PLANET_POSITIONS
    })
    END_EVENT = [difficulty, 0]
    NEXT_TURN_TYPE = CHOOSE_STARTING_POSITION
    SPACESHIP_POSITION = []
    TIME_SPENT = [0,0]
    NEXT_ROTATE_EVENT = [10, 0]
    NEXT_PASSENGER_EVENT = [20, 0]
    PASSENGER_DECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    DISCARD_PILE = []
    PLANET_PASSENGERS = [[], [], [], [], [], []]
    SHIP_PASSENGERS = [0, 0, 0, 0]
    CURRENT_TURN = {}
    shuffle(PASSENGER_DECK);
    perform_passenger_event()
    setHelperText(HELPER_TEXT_CHOOSE_STARTING_POSITION)
    ANIMATIONS_TO_BE_PERFORMED = []
    refreshUI()
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
        let el = setPosition('TU_' + i, [TU_POSITIONS[i][0]*SCALE + MAINBOARD_OFFSET[0], TU_POSITIONS[i][1]*SCALE + MAINBOARD_OFFSET[1]])
        el.style.background = 'rgba(255, 0, 0, 0)'
        el.style.boxShadow = ''
    }
    if(CURRENT_TURN.hasOwnProperty('arrival_time')){
        let el = document.getElementById('TU_' + CURRENT_TURN['arrival_time']%75)
        el.style.background = 'red'
        el.style.boxShadow = "inset 0 0 10px rgba(255, 255, 255, 0.8)"
    }
    
    for(let planet=0;planet<PLANETS.length;planet++){
        for(let i=0;i<PLANETS[planet].length;i++){
            let el = setPosition('Planet_' + planet + "_" + i, [PLANETS[planet][i][0]*SCALE + MAINBOARD_OFFSET[0], PLANETS[planet][i][1]*SCALE + MAINBOARD_OFFSET[1]])
            el.style.background = 'rgba(255, 255, 255, 0.0)'
            let el2 = setPosition('Planet_' + planet + "_" + i + "_distance", [(PLANETS[planet][i][0] - 5)*SCALE + MAINBOARD_OFFSET[0], (PLANETS[planet][i][1] - 5)*SCALE + MAINBOARD_OFFSET[1]])
            if(NEXT_TURN_TYPE != PLAYER_TURN || (SPACESHIP_POSITION[0] == planet && SPACESHIP_POSITION[1] == i))
            {
                el2.style.display = "none"
            }
            else
            {
                el2.style.display = "flex"
                el2.innerHTML = DISTANCES[SPACESHIP_POSITION[0]][SPACESHIP_POSITION[1]][planet][i]
                if(CURRENT_TURN.hasOwnProperty('destination') && CURRENT_TURN["destination"][0] == planet && CURRENT_TURN["destination"][1] == i)
                {
                    el2.style.backgroundColor = "red"
                }
                else
                {
                    el2.style.backgroundColor = "#dadada"
                }
            }
        }
        for(let i = 0; i<3;i++){
            let position = [
                SCALE*(PLANET_OFFSET[0] + 71 + Math.floor(planet/2)*150),
                SCALE*(PLANET_OFFSET[1] + i*46 + (planet % 2)*(3*46 + 12))
            ]
            passenger = setPosition('Passenger_' + i + '_Planet_' + planet, position)
            if(i<PLANET_PASSENGERS[planet].length){
                passenger.src = "pics/" + PLANET_PASSENGERS[planet][i] + ".png"
                passenger.style.opacity = 1
            }
            else
            {
                passenger.style.display = "none"
            }
            if(CURRENT_TURN.hasOwnProperty('pick_up'))
            {
                for(let p=0; p <CURRENT_TURN['pick_up'].length; p++)
                {
                    if(CURRENT_TURN['pick_up'][p][0] == i && SPACESHIP_POSITION[0] == planet){
                        passenger.style.opacity = 0.5
                    }
                }
            }

        }
    }
    if(CURRENT_TURN.hasOwnProperty('destination')){
        const destination = CURRENT_TURN['destination']
        let el = document.getElementById('Planet_' + destination[0] + "_" + destination[1])
        el.style.background = 'red'
    }

    setPosition('drawing_pile', DRAWING_PILE_OFFSET)
    let drawing_size_el = setPosition('drawing_pile_size', [DRAWING_PILE_OFFSET[0]+55, DRAWING_PILE_OFFSET[1]-10])
    drawing_size_el.style.display = 'flex';
    let drawing_pile_content_el = setPosition('drawing_pile_content', [DISCARD_PILE_OFFSET[0]-355, DRAWING_PILE_OFFSET[1]-160])
    drawing_pile_content_el.style.backgroundColor = "white"
    drawing_pile_content_el.style.display = 'none';
    setPosition('discard_pile', DISCARD_PILE_OFFSET)
    let discard_size_el = setPosition('discard_pile_size', [DISCARD_PILE_OFFSET[0]+55, DISCARD_PILE_OFFSET[1]-10])
    discard_size_el.style.display = 'flex';
    let discard_pile_content_el = setPosition('discard_pile_content', [DISCARD_PILE_OFFSET[0]-355, DISCARD_PILE_OFFSET[1]-160])
    discard_pile_content_el.style.backgroundColor = "white"
    discard_pile_content_el.style.display = 'none';

    for(let seat=0; seat<4; seat++)
    {
        let el = document.getElementById("marker_" + seat)
        el.style.position = 'absolute';
        el.style.display = 'block';
        var rect = el.getBoundingClientRect();//TODO working?
        el.style.left = SHIP_OFFSET[0] + seat*80 + 30 + "px"
        el.style.top = SHIP_OFFSET[1] - rect.height + "px"

        let el2_container = document.getElementById("seat_" + seat + "_container")
        el2_container.classList = ["full"]
        let el2 = setPosition("seat_" + seat,
            [
                SHIP_OFFSET[0] + seat*80,
                SHIP_OFFSET[1] + 10
            ]
        )
        el2.src = "pics/" + SHIP_PASSENGERS[seat] +".png"
        if(SHIP_PASSENGERS[seat] == 0)
        {
            el2.style.borderRadius = '5px';
        }
        else
        {
            el2.style.borderRadius = '0px';
        }
        if(!EVENT_LISTENERS_CREATED){
            el2.addEventListener('click', function(){
                onClickShipPassenger(seat)
            })
        }
        if(CURRENT_TURN.hasOwnProperty('pick_up'))
        {
            for(let p=0; p <CURRENT_TURN['pick_up'].length; p++)
            {
                if(CURRENT_TURN['pick_up'][p][1] == seat){
                    el2.src = "pics/" + PLANET_PASSENGERS[SPACESHIP_POSITION[0]][CURRENT_TURN['pick_up'][p][0]] +".png"
                    el2_container.classList = ["transparant"]
                }
            }
        }
    }

    setPosition('new_game', [SHIP_OFFSET[0] , DISCARD_PILE_OFFSET[1] + 70])
    setPosition('reset_turn', [SHIP_OFFSET[0] + 220, DISCARD_PILE_OFFSET[1] + 70])
    setPosition('end_turn', [SHIP_OFFSET[0] + 340, DISCARD_PILE_OFFSET[1] + 70])
    setPosition('help_button', [SHIP_OFFSET[0] + 120, DISCARD_PILE_OFFSET[1] + 70])
}

function makePlanetsClickable()
{
    for(let marker=0;marker<PLANET_MARKERS.length;marker++){
        let el = document.getElementById(PLANET_MARKERS[marker])
        if(!EVENT_LISTENERS_CREATED){
            el.addEventListener('click', function(){
                onClickPlanet(marker)})
        }
    }
    
}

document.getElementById('fixSeed').addEventListener('change', function() {
    var fixSeedInputContainer = document.getElementById('fixSeedInputContainer');
    fixSeedInputContainer.style.display = this.checked ? 'block' : 'none';
});


function show(el_id)
{
    let el = document.getElementById(el_id)
    el.style.display = 'grid'
}

function set_pile_content()
{
    for(let counter=1;counter<19;counter++)
    {
        let el = document.getElementById('drawing_pile_content_' + counter)
        if(PASSENGER_DECK.includes(counter))
        {
            el.style.opacity = 1
        }
        else
        {
            el.style.opacity = 0.2
        }
        el = document.getElementById('discard_pile_content_' + counter)
        if(DISCARD_PILE.includes(counter))
        {
            el.style.opacity = 1
        }
        else
        {
            el.style.opacity = 0.2
        }
    }
}

function getShipPosition(position)
{
    return [
        SCALE*(MAINBOARD_OFFSET[0] + PLANETS[position[0]][position[1]][0] + SHIP_POSITION_OFFSET[0]),
        SCALE*(MAINBOARD_OFFSET[1] + PLANETS[position[0]][position[1]][1] + SHIP_POSITION_OFFSET[1])
    ]
}

function getPlanetPosition(planet, number)
{
    return [
        SCALE*(PLANETS[planet][number][0] + MAINBOARD_OFFSET[0] + PLANET_POSITION_OFFSET[0]),
        SCALE*(PLANETS[planet][number][1] + MAINBOARD_OFFSET[1] + PLANET_POSITION_OFFSET[1])
    ]
}

function refreshUI()
{
    if(ANIMATIONS_TO_BE_PERFORMED.length > 0){
        perform_animation()
        return
    }
    cleanKeyframes()
    getImagePosition()
    setPositionFixedElements()
    const planet_src = ['planet_grey', 'planet_red', 'planet_orange', 'planet_yellow', 'planet_green', 'planet_blue']
    for(let marker=0;marker<PLANET_MARKERS.length;marker++){
        el = setPosition(PLANET_MARKERS[marker], getPlanetPosition(marker, CURRENT_PLANET_POSITIONS[marker]))
        el.src = "pics/" + planet_src[marker] + ".png"
    }

    if(CURRENT_TURN.hasOwnProperty('destination') && CURRENT_PLANET_POSITIONS[CURRENT_TURN["destination"][0]] == CURRENT_TURN["destination"][1])
    {
        let current_planet_dest = document.getElementById(PLANET_MARKERS[CURRENT_TURN["destination"][0]])
        current_planet_dest.src = "pics/" + planet_src[CURRENT_TURN["destination"][0]] + "_on.png"
    }
    if(SPACESHIP_POSITION.length == 2){
        el = setPosition('ship_marker', getShipPosition(SPACESHIP_POSITION))
    }

    updatePassengerDeck(PASSENGER_DECK.length)
    updateDiscardPile(DISCARD_PILE.length, DISCARD_PILE[DISCARD_PILE.length - 1])
    set_pile_content()

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
    setup(Date.now(), 120, 'Standard')
    ANIMATIONS_TO_BE_PERFORMED = []
    refreshUI()
    EVENT_LISTENERS_CREATED = true
    setNextTurnType()
    $('#new_game_modal').modal('show');

};

let drawing_pile = document.getElementById("drawing_pile");
drawing_pile.onmouseleave = function () {
    let drawing_pile_content = document.getElementById("drawing_pile_content");
    drawing_pile_content.style.display = "none";
};
let discard_pile = document.getElementById("discard_pile");
discard_pile.onmouseleave = function () {
    let discard_pile_content = document.getElementById("discard_pile_content");
    discard_pile_content.style.display = "none";
};

window.addEventListener('resize', handleResize);

function handleMouseClick(event) {
    // Get the mouse coordinates
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Log the coordinates to the console (you can use them as needed)
    console.log(`Mouse Click Position: X=${mouseX}, Y=${mouseY}`)
    //refreshUI()
    //flipCard("test")
}
document.addEventListener('click', handleMouseClick);
