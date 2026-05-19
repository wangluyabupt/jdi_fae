import { ModuleProps } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText as FileTextIcon, 
  Bot, 
  Wrench,
  Camera,
  Cpu,
  MonitorSmartphone
} from 'lucide-react';

export default function Dashboard({ onNavigate }: ModuleProps) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">今日收到新需求</CardTitle>
            <Activity className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-slate-500 mt-1">环比昨日增长 <span className="text-green-500">+12%</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">AI 拦截/修正数</CardTitle>
            <AlertCircle className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-slate-500 mt-1">拦截模糊询价与残缺参数</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">BOM 自动匹配率</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.5%</div>
            <p className="text-xs text-slate-500 mt-1">命中白牌平替库 47 次</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">终端 AI 载体在线</CardTitle>
            <MonitorSmartphone className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-slate-500 mt-1">8台桌面AI, 4副智能眼镜</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Task List / Intervention list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>待办任务 & 异常干预</CardTitle>
            <CardDescription>需要人工 FAE 介入确认的边缘场景和核心决策</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Task 1: Jump to Opportunity */}
              <div className="flex items-start justify-between p-4 border rounded-lg bg-white shadow-sm hover:border-blue-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm">伺服电机缺货替换 (现场求援)</h4>
                      <Badge variant="destructive" className="bg-red-500">优先级：高</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">陈伟 (现场工程师) 佩戴 AI 眼镜识别到电机故障，但系统未找到极其精确的 100% 匹配备件，需人工确认相近参数的平替方案。</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => onNavigate?.('opportunity')} className="shrink-0 ml-4">
                  立即处理 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Task 2: Jump to Custom */}
              <div className="flex items-start justify-between p-4 border rounded-lg bg-white shadow-sm hover:border-orange-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm">第二车间输送带法兰盘定制</h4>
                      <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100">类型：非标件</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">客户上传了最新的 3D STEP 及加急的加工图纸，算法已生成初版装配与报价单，等待 FAE 最终复核并确认下单。</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => onNavigate?.('custom')} className="shrink-0 ml-4 text-orange-600 border-orange-200 hover:bg-orange-50">
                  审核模型 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Task 3: Jump to BOM */}
              <div className="flex items-start justify-between p-4 border rounded-lg bg-white shadow-sm hover:border-blue-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileTextIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm">第三季度耗材采购总表 (大清单)</h4>
                      <Badge variant="secondary" className="bg-slate-100 hover:bg-slate-200">类型：BOM 解析</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">桌面 AI 机器人收到 120 项物料表格，已根据历史数据库自动完成映射匹配 115 项，剩余 5 项存在品类歧义，待介入。</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => onNavigate?.('bom')} className="shrink-0 ml-4">
                  继续治理 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Live Feed */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-slate-600" />
              AI 节点实时监控
            </CardTitle>
            <CardDescription>全国驻点及边缘载体自动化日志</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[380px] px-4">
            <ScrollArea className="h-full pr-4 w-full">
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-[19px] before:h-full before:w-[2px] before:bg-slate-200 pl-12 py-2">
                
                <div className="relative group">
                  <div className="absolute -left-12 flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-white bg-green-100 text-green-600 shadow-sm z-10 transition-transform group-hover:scale-110">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-3 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700 text-xs">桌面机器人(台面 C03)</span>
                      <time className="font-mono text-[10px] text-slate-400">刚好</time>
                    </div>
                    <p className="text-xs text-slate-500">自动拦截了来自2车间的缺失关键参数(内径)询价，已向一线人员推送语音质检引导单。</p>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -left-12 flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-white bg-blue-100 text-blue-600 shadow-sm z-10 transition-transform group-hover:scale-110">
                     <Camera className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-3 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700 text-xs">陈伟 (第一视角实物采)</span>
                      <time className="font-mono text-[10px] text-slate-400">14:25</time>
                    </div>
                    <p className="text-xs text-slate-500">上传了受损气缸的多角度图，模型命中 3 款高性价比的亚德客白牌气缸平替。</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-12 flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-white bg-orange-100 text-orange-600 shadow-sm z-10 transition-transform group-hover:scale-110">
                     <FileTextIcon className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-3 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700 text-xs">AI 查单代理人</span>
                      <time className="font-mono text-[10px] text-slate-400">11:15</time>
                    </div>
                    <p className="text-xs text-slate-500">响应语音指令“查昨天订单状态”，完成灵犀、E采内部跨系统拉接，并总结单据结果。</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-12 flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-white bg-purple-100 text-purple-600 shadow-sm z-10 transition-transform group-hover:scale-110">
                     <Cpu className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-3 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700 text-xs">大模型底座同步</span>
                      <time className="font-mono text-[10px] text-slate-400">03:00</time>
                    </div>
                    <p className="text-xs text-slate-500">完成施耐德工控及低压配电物料类目(MRO)参数的私有库索引及向量模型优化更新。</p>
                  </div>
                </div>

              </div>
            </ScrollArea>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
