import Random from 'random-js'

// Mersenne Twister auto-seedé
const engine = Random.engines.mt19937().autoSeed()
const distribution = Random.integer(1, 6)

export const rollD6 = () => distribution(engine)
