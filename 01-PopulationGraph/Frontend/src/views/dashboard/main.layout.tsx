'use client'

import { useLynxStore } from '@lynx/store/core'
import { Button, Col, Flex, Form, Input, message, Row, Table } from 'antd'
import './style.scss'
import IntroductionLayout from './layouts/introduction.layout'
import ChartLayout from './layouts/chart.layout'
import IncreasingLayout from './layouts/increasing.layout'
import DecreasingLayout from './layouts/decreasing.layout'

const formSpan = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
}
export default function BaseLayout() {
  return (
    <Flex className="h-full" vertical gap={6}>
      <IntroductionLayout />
      <Row gutter={8} className="px-6 py-4 h-full">
        <Col xxl={16} xl={14} lg={12} md={24} xs={24} sm={24}>
          <ChartLayout />
        </Col>
        <Col xxl={8} xl={5} lg={6} md={12} xs={24} sm={24}>
          <Row gutter={12} className="gap-y-12">
            <Col xxl={24} xl={24} lg={24} md={12} xs={24} sm={24}>
              <IncreasingLayout />
            </Col>
            <Col xxl={24} xl={24} lg={24} md={12} xs={24} sm={24}>
              <DecreasingLayout />
            </Col>
          </Row>
        </Col>
      </Row>
    </Flex>
  )
}
