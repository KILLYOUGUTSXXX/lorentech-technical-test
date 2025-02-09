import { ConfigProvider } from 'antd'

import '../global-styles/font.css'
import '../global-styles/globals.css'
import '../global-styles/style.scss'
import 'normalize.css/normalize.css'
import { lazy } from 'react'

const DashboardView = lazy(() => import('@afx/views/dashboard/index.layout'))

export const metadata = {
  title: 'Lorentech - Aidil Febrian'
}

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ac5237'
            }
          }}
        >
          <div className="bg-white w-[100dvw] h-[100dvh] text-stone-700 block relative">
            <DashboardView>{children}</DashboardView>
          </div>
        </ConfigProvider>
      </body>
    </html>
  )
}
