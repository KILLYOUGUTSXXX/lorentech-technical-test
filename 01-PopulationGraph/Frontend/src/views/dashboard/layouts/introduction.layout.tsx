import { Flex } from 'antd'

export default function IntroductionLayout() {
  return (
    <Flex
      vertical
      gap={12}
      justify="space-between"
      className="w-full px-6 py-4 bg-green-400 h-[200px]"
    >
      <Flex vertical gap={8}>
        <p className="text-[32px] font-semibold">
          Dashboard Sensus Penduduk 2024
        </p>
        <p className="text-[18px] font-semibold">Credit by : Aidil Febrian</p>
      </Flex>
    </Flex>
  )
}
