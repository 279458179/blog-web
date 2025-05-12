import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      )
    }

    const decoded = verify(token, JWT_SECRET) as { role: string }
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: '需要管理员权限' },
        { status: 403 }
      )
    }

    const { currentPassword, newPassword } = await request.json()

    // TODO: 验证当前密码并更新新密码
    // 这里需要实现实际的密码验证和更新逻辑
    // 例如：检查数据库中的密码，更新为新密码

    return NextResponse.json({ message: '密码修改成功' })
  } catch (error) {
    console.error('修改密码失败:', error)
    return NextResponse.json(
      { error: '修改密码失败' },
      { status: 500 }
    )
  }
} 