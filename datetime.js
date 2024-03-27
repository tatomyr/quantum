export const formatTime = (t) => {
    if (typeof t !== "number" || isNaN(t))
        return "Unknown time";
    const s = t / 1000;
    if (s < 60)
        return `${Math.round(s)} s`;
    const m = s / 60;
    if (m < 60)
        return `${Math.round(m)} min`;
    const h = m / 60;
    if (h < 24)
        return `${Math.round(h)} h`;
    const d = h / 24;
    return `${Math.round(d)} day(s)`;
};
