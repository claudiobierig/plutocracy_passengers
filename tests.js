QUnit.module('onClickTimeSpace');

QUnit.test('start of game', function (assert) {
    setup(Date.now(), 120, 'Standard')
    assert.true(onClickTimeSpace(0) == 0, 'not player turn');
});

QUnit.test('player turn', function (assert) {
    setup(Date.now(), 120, 'Standard')
    NEXT_TURN_TYPE = PLAYER_TURN
    assert.true(onClickTimeSpace(0) == 1, 'no destination chosen yet');
});

QUnit.test('standard click', function (assert) {
    setup(Date.now(), 120, 'Standard')
    SPACESHIP_POSITION=[0, 0]
    CURRENT_TURN['destination'] = [0, 1]
    NEXT_TURN_TYPE = PLAYER_TURN
    const values = [[0, 75, 75], [7, 82, 82], [8, 8, 83], [9, 9, 84], [18, 18, 93], [19, 19, 19], [20, 20, 20]]
    for(let v=0; v< values.length; v++){
        let result = onClickTimeSpace(values[v][0])
        assert.true(result == values[v][1]);
        assert.true(result == CURRENT_TURN['arrival_time'])
    }
    TIME_SPENT = [11, 0]
    for(let v=0; v< values.length; v++){
        let result = onClickTimeSpace(values[v][0])
        assert.true(result == values[v][2]);
        assert.true(result == CURRENT_TURN['arrival_time'])
    }
    TIME_SPENT = [86, 0]
    for(let v=0; v< values.length; v++){
        let result = onClickTimeSpace(values[v][0])
        assert.true(result == values[v][2] + 75);
        assert.true(result == CURRENT_TURN['arrival_time'])
    }
});

QUnit.module('onClickHex');
QUnit.test('start of game', function (assert) {
    setup(Date.now(), 120, 'Standard')
    onClickHex(0, 0)
    assert.true(CURRENT_TURN['destination'][0] == 0)
    assert.true(CURRENT_TURN['destination'][1] == 0)
});

QUnit.test('player turn', function (assert) {
    setup(Date.now(), 120, 'Standard')
    SPACESHIP_POSITION=[0, 0]
    NEXT_TURN_TYPE = PLAYER_TURN
    onClickHex(0, 1)
    assert.true(CURRENT_TURN['destination'][0] == 0)
    assert.true(CURRENT_TURN['destination'][1] == 1)
    assert.true(CURRENT_TURN['arrival_time'] == 8)
});

QUnit.module('onClickPlanet');
QUnit.test('forwards to on click hex', function (assert) {
    setup(Date.now(), 120, 'Standard')
    CURRENT_PLANET_POSITIONS[5] = 3
    onClickPlanet(5)
    assert.equal(CURRENT_TURN['destination'][0], 5)
    assert.equal(CURRENT_TURN['destination'][1], 3)
});