export interface TemperatureFormatter {
  format(temp: number): number;
}

export class CelsiusFormatter implements TemperatureFormatter {
  format(temp: number): number {
    return temp;
  }
}

export class FahrenheitFormatter implements TemperatureFormatter {
  format(temp: number): number {
    const fahrenheit = (temp * 9) / 5 + 32;

    return fahrenheit;
  }
}
