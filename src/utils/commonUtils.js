import { formatDistance } from 'date-fns';
import axios from 'axios';

export const getFormatDistance = (currentDate) => {
    let distanceString = formatDistance(new Date(currentDate), new Date(), {
        addSuffix: true
    });
    return distanceString;
};

export const fetchImageData = async(url) => {
    const response = await axios.get(url, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
};

// Function to generate slots
export const generateTimeSlots = (options) => {
    if (
    !options ||
    !options?.no_of_patients ||
    !options?.slot_duration ||
    !options?.slot_interval ||
    !options?.start_time
    ) {
    return null;
    }

    const { no_of_patients, slot_duration, slot_interval, start_time } =
    options;

    const patients = parseInt(no_of_patients);
    const duration = parseInt(slot_duration);
    const interval = parseInt(slot_interval);

    const [startHour, startMinute] = start_time.split(":").map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;
    const slots = [];

    for (let i = 0; i < patients; i++) {
    const slotStart = `${currentHour
        .toString()
        .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

    const slotEndHour = currentHour + Math.floor(duration / 60);
    const slotEndMinute = currentMinute + (duration % 60);
    const slotEnd = `${slotEndHour
        .toString()
        .padStart(2, "0")}:${slotEndMinute.toString().padStart(2, "0")}`;

    const label = `${slotStart}-${slotEnd}`;

    slots.push({
        label: label,
        value: label,
    });

    currentMinute += interval;
    if (currentMinute >= 60) {
        currentHour++;
        currentMinute -= 60;
    }
    if (i === patients - 1) break;
    }
    return slots;
}