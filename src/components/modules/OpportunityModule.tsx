import { useState } from 'react';
import { ModuleProps } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Camera, AlertTriangle, CheckCircle, Search, Upload, Bot } from 'lucide-react';

export default function OpportunityModule({ onNavigate }: ModuleProps) {
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [imageResult, setImageResult] = useState<any>(null);

  const simulateImageAnalysis = () => {
    setAnalyzingImage(true);
    setImageResult(null);
    setTimeout(() => {
      setAnalyzingImage(false);
      setImageResult({
        identified: '交流伺服电机 (故障件)',
        skuMatches: [
          { id: 'SKU-09213', name: '汇川 IS620P-S5R5I 400W', price: '￥1,850.00', match: '98%', stock: '北京中心仓 3件 (告急)' },
          { id: 'SKU-88211', name: '禾川 X6-400W 伺服系统 (高性价比方案)', price: '￥980.00', match: '94%', stock: '全国多仓 货源充足' }
        ]
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="image-recognition" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="image-recognition">现场实物识图替换</TabsTrigger>
          <TabsTrigger value="fuzzy-inquiry">模糊询价单质检</TabsTrigger>
        </TabsList>

        <TabsContent value="image-recognition" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                 <CardTitle className="flex items-center">
                   <Camera className="w-5 h-5 mr-2" />
                   AI 智能硬件传图
                 </CardTitle>
                 <CardDescription>来自工业 AI 眼镜的实时捕捉或本地上传图片</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] bg-slate-50 relative">
                   <img src="https://images.unsplash.com/photo-1532522750741-628fde798c73?w=400&h=300&fit=crop" alt="Servo Motor" className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg" />
                   <div className="z-10 text-center space-y-4">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                       <Upload className="w-8 h-8 text-slate-400" />
                     </div>
                     <p className="text-sm font-medium text-slate-700">陈伟 (现场) 已推流当前故障件视图</p>
                     <Button onClick={simulateImageAnalysis} disabled={analyzingImage}>
                       {analyzingImage ? 'Embedding 模型比对中...' : '诊断故障件并匹配白牌平替'}
                     </Button>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                 <CardTitle>识别与匹配结果</CardTitle>
                 <CardDescription>依据图像特征检索 SKU 和白牌平替方案</CardDescription>
              </CardHeader>
              <CardContent>
                {analyzingImage ? (
                  <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-red-500 rounded-full animate-spin"></div>
                    <p className="text-sm text-slate-500">正在检索产品库并计算预算...</p>
                  </div>
                ) : imageResult ? (
                  <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      识别品类：{imageResult.identified}
                    </div>
                    
                    <h4 className="text-sm font-semibold text-slate-900 mt-4 mb-2">推荐 SKU 列表：</h4>
                    <div className="space-y-3">
                      {imageResult.skuMatches.map((sku: any, idx: number) => (
                        <div key={idx} className="p-3 border rounded-lg hover:border-red-300 transition-colors flex justify-between items-center bg-white cursor-pointer group">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{sku.name}</span>
                              {idx === 1 && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">平替推荐</Badge>}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">代码: {sku.id} | 匹配度: <span className="text-green-600">{sku.match}</span> | {sku.stock}</div>
                          </div>
                          <div className="text-right">
                             <div className="font-bold text-red-600">{sku.price}</div>
                             <Button size="sm" variant="ghost" className="h-6 text-xs mt-1 text-slate-500 group-hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">一键下单</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 mt-2 border-t flex justify-end gap-2">
                      <Button variant="outline">向陈伟发起语音核实</Button>
                      <Button>确认平替方案并下发采购单</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                    <Search className="w-12 h-12 mb-4 opacity-20" />
                    <p>等待图像输入...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fuzzy-inquiry" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>模糊询价单自动质检 (案例)</CardTitle>
              <CardDescription>产线上报需求通常型号不全、参数模糊，AI 将自动分析缺失字段并提示补齐。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 border rounded-lg max-w-2xl">
                  <h4 className="text-sm font-semibold mb-2">原始手工寻源单：</h4>
                  <div className="font-mono text-sm text-slate-700 bg-white p-3 border border-slate-200 rounded">
                    "需要买几个轴承，外径 40mm 的，用于二号车间的输送带，速度要快点发货。"
                  </div>
                </div>

                <div className="flex items-start max-w-2xl">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-5 flex-1 shadow-sm relative">
                     <div className="absolute -left-3 top-5 w-6 h-6 bg-red-100 border border-red-200 rounded-full flex items-center justify-center text-red-600">
                       <Bot className="w-3 h-3" />
                     </div>
                     <h4 className="text-sm font-semibold text-red-800 flex items-center mb-3">
                       <AlertTriangle className="w-4 h-4 mr-2" />
                       AI 质检结果：参数缺失阻断
                     </h4>
                     <p className="text-sm text-slate-700 mb-4">该需求无法精准寻源，存在 <span className="font-bold text-red-600">3项</span> 关键参数缺失，请提示产线人员或通过桌面机器人辅助语音补齐：</p>
                     
                     <div className="space-y-3">
                       <div className="flex items-center space-x-3 text-sm">
                         <div className="w-24 text-slate-500 font-medium">缺乏内径：</div>
                         <Input placeholder="请输入内径 (如 17mm)" className="h-8 max-w-[200px]" />
                       </div>
                       <div className="flex items-center space-x-3 text-sm">
                         <div className="w-24 text-slate-500 font-medium">缺乏厚度：</div>
                         <Input placeholder="请输入厚度 (如 12mm)" className="h-8 max-w-[200px]" />
                       </div>
                       <div className="flex items-center space-x-3 text-sm">
                         <div className="w-24 text-slate-500 font-medium">类型确认：</div>
                         <div className="flex space-x-2">
                           <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">深沟球轴承</Badge>
                           <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">角接触球轴承</Badge>
                           <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">更具体的类型</Badge>
                         </div>
                       </div>
                     </div>

                     <div className="mt-5 flex justify-end">
                       <Button size="sm">发送确认消息至提出人</Button>
                     </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}