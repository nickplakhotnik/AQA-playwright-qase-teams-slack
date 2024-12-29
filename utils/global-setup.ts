let startTime: number;

export const getStartTime = () => startTime;

export default async function globalSetup() {
    startTime = Date.now();
}
