import { ViewMode } from '@/types'
import { Button } from 'antd'
import { LayoutGrid, List } from 'lucide-react'

interface ViewToggleProps {
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
}

const ViewToggle = ({ viewMode, onChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        type={viewMode === 'grid' ? 'primary' : 'default'}
        onClick={() => onChange('grid')}
        className="flex items-center justify-center"
      >
        <LayoutGrid size={16} />
      </Button>
      <Button
        type={viewMode === 'list' ? 'primary' : 'default'}
        onClick={() => onChange('list')}
        className="flex items-center justify-center"
      >
        <List size={16} />
      </Button>
    </div>
  )
}

export default ViewToggle
