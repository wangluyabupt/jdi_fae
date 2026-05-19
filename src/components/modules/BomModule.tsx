import { useState } from 'react';
import { ModuleProps } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileUp, FileSpreadsheet, MapPin, Database, Link as LinkIcon, User } from 'lucide-react';

export default function BomModule({ onNavigate }: ModuleProps) {
  const [parsing, setParsing] = useState(false);
  const [bomData, setBomData] = useState<any>(null);

  const mockParse = () => {
    setParsing(true);
    setTimeout(() => {
      setBomData([
        { id: 1, raw: '西门子变频器 G120', recognized: 'SIEMENS G120 15KW', status: 'match', contact: '陈工(电控采销)', mappedSku: '6SL3210-xxx' },
        { id: 2, raw: '施耐德空开 3P 63A', recognized: 'Schneider iC65N 3P 63A C型', status: 'match', contact: '林经理(低压采销)', mappedSku: 'A9F74363' },
        { id: 3, raw: '杂牌水泵 2KW (未标明扬程)', recognized: '品类冲突：需补充扬程参数', status: 'error', contact: '-', mappedSku: '-' },
        { id: 4, raw: '欧姆龙光电开关 E3Z', recognized: 'OMRON E3Z-D61', status: 'replace', contact: '赵智(工控)', mappedSku: '智能平替: 基恩士 PZ-G系列' },
      ]);
      setParsing(false);
    }, 2000);
  };

  const handleFixError = (id: number) => {
    // Simulate AI fixing an error line
    setBomData((prev: any) => 
      prev.map((item: any) => 
        item.id === id ? { ...item, status: 'match', recognized: '南方泵业 CDL2-15 2KW', mappedSku: '白牌平替优选库', contact: '刘采(通用设备)' } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              BOM 自动解析与治理
            </CardTitle>
            <CardDescription>一键导入 BOM 表或技术规范书，自动完成治理与替代件推荐</CardDescription>
          </CardHeader>
          <CardContent>
            {!bomData ? (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50">
                <FileUp className="w-12 h-12 text-blue-300 mb-4" />
                <h3 className="text-sm font-semibold mb-2">拖拽或点击上传 BOM 文件 (.xlsx/pdf)</h3>
                <p className="text-xs text-slate-500 mb-6 text-center max-w-xs">AI 将自动抽取文本内容，并针对物料库进行匹配与规格书提取。</p>
                <Button onClick={mockParse} disabled={parsing}>
                  {parsing ? 'BOM 深度解析中...' : '模拟上传测试文件'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in transition duration-500">
                <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md">
                   <div className="flex items-center space-x-2">
                     <Database className="w-4 h-4 text-blue-600" />
                     <span className="text-sm font-medium text-blue-800">解析完成：成功匹配 2 项，推荐替代 1 项，需人工介入 1 项。</span>
                   </div>
                   <Button size="sm" variant="outline" onClick={() => setBomData(null)}>重新解析</Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>原始描述</TableHead>
                        <TableHead>AI 识别及映射 SKU</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead className="w-[100px]">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bomData.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.raw}</TableCell>
                          <TableCell>
                            <div>{row.recognized}</div>
                            <div className="text-xs text-slate-500 mt-1">{row.mappedSku}</div>
                          </TableCell>
                          <TableCell>
                            {row.status === 'match' && <span className="text-green-600 text-xs bg-green-50 px-2 py-1 rounded border border-green-200">库内精确匹配</span>}
                            {row.status === 'replace' && <span className="text-yellow-600 text-xs bg-yellow-50 px-2 py-1 rounded border border-yellow-200">白牌平替推荐</span>}
                            {row.status === 'error' && <span className="text-red-600 text-xs bg-red-50 px-2 py-1 rounded border border-red-200">信息残缺缺失</span>}
                          </TableCell>
                          <TableCell>
                            {row.status === 'error' ? (
                              <Button variant="outline" size="sm" className="h-8 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleFixError(row.id)}>
                                AI 补全
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="h-8 border">选型详情</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              采销资源地图
            </CardTitle>
            <CardDescription>输入物料定位负责该品类的内部采销</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input placeholder="例如：输入 '电线电缆'" className="pr-10" />
                <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                </Button>
              </div>

              {bomData && (
                <div className="pt-4 border-t space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">从当前 BOM 提取的关键联系人</h4>
                  {Array.from(new Set(bomData.filter((r:any) => r.contact !== '-').map((r:any) => r.contact))).map((contact: any, i) => (
                    <div key={i} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{contact.split('(')[0]}</div>
                        <div className="text-xs text-slate-500">{contact.split('(')[1].replace(')', '')} 负责人</div>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">发起咚咚</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
