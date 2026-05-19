import React, { useState, useRef, useEffect } from 'react';
import { ModuleProps } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Mic, Send, FileText, Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
} 

export default function AiAssistantModule({ onNavigate }: ModuleProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '您好！我是您的专属 AI 采购助理。我可以帮您：\n1. 跨系统查单（灵犀、灵镜、E采）\n2. 快速获取授权资质或检测报告\n3. 在线选型与数据分析\n由于您绑定了桌面 AI 机器人，您也可以直接通过语音对我下达指令。',
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputVal };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Simulate AI response based on content
    setTimeout(() => {
      let aiContent: React.ReactNode = "已收到您的请求正在处理...";
      
      const query = userMsg.content as string;
      if (query.includes('查昨天中粮') || query.includes('订单状态')) {
        aiContent = (
          <div className="space-y-3">
            <p>为您找到以下订单状态报告（聚合自灵犀与E采）：</p>
            <div className="bg-white border rounded-lg p-3 text-sm text-slate-800 shadow-sm">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <span className="font-medium">订单号：JD-GY-20231012</span>
                <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">出库中</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                 <div className="text-slate-500">客户：中粮集团项目组</div>
                 <div className="text-slate-500">预计到达：明天下午 14:00</div>
                 <div className="col-span-2 mt-2">
                   最新动态：<span className="text-slate-700">北京仓已拣货完毕，等待顺丰揽收。</span>
                 </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs w-full"><FileText className="w-3 h-3 mr-1" /> 生成系统售后单据草稿</Button>
          </div>
        );
      } else if (query.includes('授权') || query.includes('资质')) {
        aiContent = (
          <div className="space-y-3">
             <p>已通过 AI Agent 前往产品库及采销接口拉取资料：</p>
             <div className="flex items-center p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded text-red-500 mr-3">
                  <Download className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">3M 品牌经销授权书 2023-2024.pdf</div>
                  <div className="text-xs text-slate-500">3.2 MB</div>
                </div>
                <Button size="sm">下载使用</Button>
             </div>
             <p className="text-xs text-slate-500 mt-2">注：此授权书符合当前招投标标准。</p>
          </div>
        );
      } else {
        aiContent = '我已经记录了您的需求，正在联合库内数据和工程师帮您提供方案，请稍后在消息中心查看。';
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiContent
      }]);
    }, 1200);
  };

  return (
    <Card className="h-[calc(100vh-140px)] flex flex-col">
      <CardHeader className="border-b shadow-sm pb-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center text-lg">
            <Bot className="w-5 h-5 mr-2 text-blue-600" />
            AI 伴随式工作流 (查单机器人/在线问答/资质拉取)
          </CardTitle>
          <CardDescription>打通内部多平台，生成子单状态报告，辅助招投标授权抓取。</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">办公桌面级接入支持</Badge>
          <Badge variant="outline" className="bg-slate-50 border-slate-200">移动端同步</Badge>
        </div>
      </CardHeader>
      
      <div className="flex-1 overflow-hidden relative bg-slate-50 p-4">
        <ScrollArea className="h-full pr-4" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                  {msg.role === 'assistant' ? (
                     <div className="bg-blue-600 w-full h-full flex items-center justify-center text-white"><Bot className="w-5 h-5" /></div>
                  ) : (
                    <AvatarFallback className="bg-slate-200"><User className="w-5 h-5 text-slate-500" /></AvatarFallback>
                  )}
                </Avatar>
                <div className={`mx-3 ${msg.role === 'user' ? 'min-w-[40px]' : 'flex-1'}`}>
                  {msg.role === 'user' ? (
                    <div className="bg-red-500 text-white p-3 rounded-lg rounded-tr-none text-sm break-words shadow-sm">
                      {msg.content as string}
                    </div>
                  ) : (
                    <div className="bg-white border text-sm text-slate-800 p-4 rounded-lg rounded-tl-none shadow-sm space-y-2 leading-relaxed">
                      {typeof msg.content === 'string' ? msg.content.split('\n').map((line, i) => <p key={i}>{line}</p>) : msg.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
           <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600" onClick={() => setInputVal('查昨天中粮订单状态')}>"查昨天中粮订单状态"</Button>
           <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600" onClick={() => setInputVal('帮我拉取3M品牌的代理资质书')}>"拉取3M品牌资质"</Button>
           <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600">"生成这批设备的评标分析"</Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 shrink-0">
             <Mic className="w-5 h-5" />
          </Button>
          <Input 
            value={inputVal} 
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="输入指令，或者点击麦克风对着桌面机器人说话..." 
            className="flex-1 shadow-sm focus-visible:ring-red-500"
          />
          <Button onClick={handleSend} className="bg-red-600 hover:bg-red-700 shrink-0 shadow-sm">
            <Send className="w-4 h-4 mr-2" />
            发送
          </Button>
        </div>
      </div>
    </Card>
  );
}
