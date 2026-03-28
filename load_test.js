import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Leer datos de credenciales desde CSV
const csvData = new SharedArray('credentials', function() {
    return papaparse.parse(open('./credentials.csv'), { header: true }).data;
});

export const options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: 20, // 20 TPS (transacciones por segundo)
            timeUnit: '1s',
            duration: '1m', // Duración de la prueba
            preAllocatedVUs: 10, // VUs iniciales
            maxVUs: 30, // Máximo de VUs
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<1500'], // 95% de peticiones < 1.5s
        http_req_failed: ['rate<0.03'],    // Tasa de error < 3%
    },
};

export default function () {
    // Seleccionar credenciales aleatorias
    const randomIndex = Math.floor(Math.random() * csvData.length);
    const user = csvData[randomIndex].user;
    const passwd = csvData[randomIndex].passwd;

    const url = 'https://fakestoreapi.com/auth/login';
    const payload = JSON.stringify({
        username: user,
        password: passwd,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: '1.5s',
    };

    const res = http.post(url, payload, params);

    // Validaciones
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has token': (r) => r.json().token && r.json().token.length > 0,
    });
}
