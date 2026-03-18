import fs from 'fs';

const data = JSON.parse(fs.readFileSync('test-signup.json', 'utf8'));

(async () => {
    try {
        const res = await fetch('http://localhost:3001/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const text = await res.text();
        console.log('Signup response status:', res.status);
        console.log('Response body:', text);
    } catch (err) {
        console.error('Error during signup request:', err);
    }
})();
