import { Button } from "antd"
import { ExportOutlined } from '@ant-design/icons'

export const CSVButton = () => {

    const exportToCVS = () => {
        
    }

    return (
        <Button
            onClick={exportToCVS}
            size="large"
        >
            <ExportOutlined />
            Экспорт CSV
        </Button>
    )
}

export default CSVButton