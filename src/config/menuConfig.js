const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'icon-index-0-copy', // 图标名称
    isPublic: true // 公开页面
  },
  {
    title: '商品',
    key: '/products',
    icon: 'icon-shangpin',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: 'icon-leimupinleifenleileibie'
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'icon-guanli'
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'icon-yonghu'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'icon-jiaose',
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'icon-biaoge',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'icon-tubiaozhuxingtu'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'icon-tubiaoxian_tongyong_tongji'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'icon-tubiao08'
      },
    ]
  },
  {
    title: '订单管理',
    key: '/order',
    icon: 'icon-jiaose',
  }
]
export default menuList