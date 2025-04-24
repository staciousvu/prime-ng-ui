

export interface HeaderControl {
    type: 'button' | 'select' | 'switch';
    label?: string;
    value?: any;
    options?: {
      label: string;
      value: any;
      onSelect?: () => void; // <- gọi khi chọn option này
    }[];
    action?: () => void;
    disabled?: boolean;
  }
  