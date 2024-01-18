
export function colorsChart(numberOfLabels: number): string[]
{
    const colors = []
    for (let i = 0; i < numberOfLabels; i++) {
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        colors.push(color)
    }

    return colors
}
