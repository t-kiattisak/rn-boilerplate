export const resources = {
  en: {
    common: {
      appName: "Boilerplate App",
      ok: "OK",
      cancel: "Cancel",
      save: "Save",
      retry: "Retry",
      scanning: "Scanning...",
      connect: "Connect",
      disconnect: "Disconnect",
      connected: "Connected",
      disconnected: "Disconnected",
      error: "Error",
    },
    device: {
      scanTitle: "Scan for Devices",
      measurementTitle: "Device Measurement",
      searching: "Searching for nearby sensors...",
      noDevices: "No devices found yet.",
      measuring: "Taking measurement from sensor...",
      waiting: "Waiting for sensor readings...",
    }
  },
  th: {
    common: {
      appName: "แอปพลิเคชันเทมเพลต",
      ok: "ตกลง",
      cancel: "ยกเลิก",
      save: "บันทึก",
      retry: "ลองใหม่",
      scanning: "กำลังสแกน...",
      connect: "เชื่อมต่อ",
      disconnect: "ยกเลิกการเชื่อมต่อ",
      connected: "เชื่อมต่อแล้ว",
      disconnected: "ไม่ได้เชื่อมต่อ",
      error: "เกิดข้อผิดพลาด",
    },
    device: {
      scanTitle: "ค้นหาอุปกรณ์",
      measurementTitle: "การวัดค่าจากอุปกรณ์",
      searching: "กำลังค้นหาเซ็นเซอร์ใกล้เคียง...",
      noDevices: "ไม่พบอุปกรณ์ในขณะนี้",
      measuring: "กำลังวัดค่าจากเซ็นเซอร์...",
      waiting: "กำลังรอรับค่าสัญญาณ...",
    }
  }
} as const;

export type LanguageResources = typeof resources;
