import { Button } from "antd"
import { FilePdfOutlined } from '@ant-design/icons'

export const PDFButton = () => {

    const exportToPDF = () => {
        
    }

    return (
        <Button
            onClick={exportToPDF}
            size="large"
        >
            <FilePdfOutlined />
            PDF-отчёт
        </Button>
    )
}

export default PDFButton