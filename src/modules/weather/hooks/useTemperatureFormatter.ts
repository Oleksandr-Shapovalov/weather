import { useState } from 'react';
import { TemperatureFormatter } from '../utils/TemperatureFormatter';

export const useTemperatureFormatter = (temperatureFormatter: TemperatureFormatter) => {
  const [_temperatureFormatter, setTemperatureFormatter] =
    useState<TemperatureFormatter>(temperatureFormatter);

  const formatTemperature = (temp: number): number => {
    return _temperatureFormatter.format(temp);
  };

  return { setTemperatureFormatter, formatTemperature };
};
