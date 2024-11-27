import ServiceForm from '@/components/features/services/ServiceForm'
import PageHeader from '@/components/ui/PageHeader'
import { useServices } from '@/hooks/useServices'
import { useClinicStore } from '@/store/useClinicStore'
import { Service } from '@/types'
import { Button, Card, Space, Table } from 'antd'

const ServicesPage = () => {
  const { selectedClinic } = useClinicStore()
  const { services, deleteService } = useServices(selectedClinic?.id || '')

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Duration (min)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Service) => (
        <Space>
          <ServiceForm service={record} />
          <Button
            danger
            onClick={() => deleteService.mutate(record.id)}
            loading={deleteService.isPending}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="Services" action={<ServiceForm />} />

      <Card>
        <Table
          columns={columns}
          dataSource={services.data}
          loading={services.isLoading}
          rowKey="id"
        />
      </Card>
    </div>
  )
}

export default ServicesPage
