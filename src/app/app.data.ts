import { ProfileInterface } from './interfaces/profile.interface';

export const defaultProfile: ProfileInterface = {
    name: 'Default Set',
    cards: [
        {
            id: 0,
            address: '1EY2jSam6Q5Kp7D1sbBMhvX8z74Qmkkeuc',
            name: 'Account 1',
            blockchain: 'bitcoin',
            icon: 'btc',
            transactions: [],
            series: [],
            average5: 0,
            average10: 0,
            total5: 0,
            total10: 0,
            highest: 0,
            lowest: 0,
        },
        {
            id: 1,
            address: '0xe055248df087faba7758055cbdf6aa9acf246627',
            name: 'Account 2',
            blockchain: 'ethereum',
            icon: 'eth',
            transactions: [],
            series: [],
            average5: 0,
            average10: 0,
            total5: 0,
            total10: 0,
            highest: 0,
            lowest: 0,
        },
        {
            id: 2,
            address: '9K8QMqQkuCxUFHFh2JogHNEtXSestisnXNdzDwPeDECU',
            name: 'Account 3',
            blockchain: 'solana',
            icon: 'sol',
            transactions: [],
            series: [],
            average5: 0,
            average10: 0,
            total5: 0,
            total10: 0,
            highest: 0,
            lowest: 0,
        },
    ],
};
