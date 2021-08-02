import dayjs from "dayjs";


const memory_format = (data: number) => {
    const heap = data / 1024 / 1024;
    return `${Math.round(heap * 100) / 100} MB`;
};

export default {
    start_time: dayjs(),
    format: (time: Date, data: any, message: string) => ({
        time: dayjs(time).format("HH:mm:ss"),
    })
}