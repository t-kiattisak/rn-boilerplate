/**
 * Standard Bluetooth GATT Service UUIDs (16-bit short form)
 * defined by the Bluetooth Special Interest Group (SIG).
 */
export const bleServiceConstant = {
  BLOOD_PRESSURE: '1810', // Blood Pressure Service
  BODY_COMPOSITION: '181B', // Body Composition Service
  HEALTH_THERMOMETER: '1809', // Health Thermometer Service
  PULSE_OXIMETER: '1822', // Pulse Oximeter Service (GATT)
  WEIGHT_SCALE: '181D', // Weight Scale Service
} as const;
