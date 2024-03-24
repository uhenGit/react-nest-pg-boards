interface IndicatorProps {
  beforeId: string | null,
  column: string,
}

export const Indicator = ({ beforeId, column }: IndicatorProps) => {
  return(
    <div
      data-before={ beforeId || '-1' }
      data-column={ column }
      style={{ height: '10px', opacity: '0' }}
      className="my-1 w-100 bg-info"
    />
  )
}