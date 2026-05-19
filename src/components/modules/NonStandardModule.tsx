import { useState, useRef } from 'react';
import { ModuleProps } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box as BoxIcon, Settings as SettingsIcon, Package, FileCode2, Play } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder } from '@react-three/drei';

function MechanicalPart() {
  const meshRef = useRef<any>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Optional: Add some slight slow rotation when user isn't interacting
    }
  });

  return (
    <group ref={meshRef}>
      <Cylinder args={[1, 1, 0.5, 32]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Box args={[0.5, 1.5, 0.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.3} />
      </Box>
      <Cylinder args={[0.8, 0.8, 0.2, 32]} position={[0, 1.3, 0]}>
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
      </Cylinder>
    </group>
  );
}

export default function NonStandardModule({ onNavigate }: ModuleProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const simulateProcessing = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        bom: ['精密导轨 x2', '铝合金支架基座 (CNC 加工)', 'M4 标准螺丝 x12', '定制法兰盘 (3D打印/机加)'],
        price: '￥1,250.00',
        days: '3-4个工作日',
        confidence: '89%'
      });
      setLoading(false);
    }, 2500);
  };

  const handleUploadClick = () => {
    setIsUploaded(true);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-600">
          <BoxIcon className="w-5 h-5 mr-2" />
          非标件智能定制报价
        </CardTitle>
        <CardDescription>上传 2D/3D 文件或实物图，自动生成装配方案、BOM 并实现智能报价（构建工业护城河）。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="space-y-4">
             <div 
                className={`border rounded-lg p-1 relative aspect-[4/3] flex flex-col items-center justify-center transition overflow-hidden
                ${isUploaded ? 'bg-slate-900 border-slate-700' : 'border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 group'}`}
                onClick={!isUploaded ? handleUploadClick : undefined}
             >
               {!isUploaded ? (
                 <div className="absolute inset-0 m-4 border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center group-hover:border-orange-300 transition-colors">
                    <FileCode2 className="w-10 h-10 mb-3 text-slate-400 group-hover:text-orange-500" />
                    <p className="text-sm font-medium">拖拽 STP, STEP, IGS 文件到此区域</p>
                    <p className="text-xs text-slate-400 mt-1">支持通过 AI 眼镜拍摄或点击模拟上传</p>
                 </div>
               ) : (
                 <>
                   <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur border border-white/10">
                     非标件_V2.step (拖动可旋转/缩放)
                   </div>
                   <Canvas camera={{ position: [2, 2, 3], fov: 45 }}>
                     <ambientLight intensity={1.5} />
                     <directionalLight position={[10, 10, 5]} intensity={2} />
                     <pointLight position={[-10, -10, -10]} intensity={1} />
                     <MechanicalPart />
                     <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={!result && !loading} autoRotateSpeed={1.5} />
                   </Canvas>
                 </>
               )}
             </div>
             <Button 
               className="w-full bg-orange-600 hover:bg-orange-700" 
               onClick={simulateProcessing} 
               disabled={loading || !isUploaded}
             >
               {loading ? '3D 特征提取与装配演算中...' : isUploaded ? '生成装配方案与智能报价' : '请先上传 3D 模型'}
             </Button>
          </div>

          {/* Result Area */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-slate-300 flex flex-col relative overflow-hidden">
             {/* Tech decoration */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <SettingsIcon className="w-32 h-32 animate-[spin_10s_linear_infinite]" />
             </div>

             <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-700 pb-2 flex items-center">
               <Play className="w-4 h-4 mr-2 text-orange-500" />
               演算结果控制台
             </h3>

             {loading && (
               <div className="flex-1 flex flex-col justify-center font-mono text-sm space-y-2">
                 <p className="text-green-500">&gt; Loading AI Model: 3D-Geometric-Analysis_v2...</p>
                 <p className="text-green-500 animate-pulse">&gt; Parsing STEP file structure...</p>
                 <p className="text-slate-500">&gt; Identifying standard parts...</p>
                 <p className="text-slate-500">&gt; Calculating CNC machining path for custom block...</p>
                 <p className="text-slate-500">&gt; Estimating material costs based on JD real-time database...</p>
               </div>
             )}

             {result && !loading && (
               <div className="flex-1 flex flex-col space-y-6 animate-in fade-in zoom-in duration-500">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider flex items-center">
                      <Package className="w-4 h-4 mr-1" />
                      拆解自动生成的 BOM
                    </h4>
                    <ul className="space-y-2">
                      {result.bom.map((item: string, idx: number) => (
                        <li key={idx} className="bg-slate-800 p-2 rounded text-sm text-slate-200 border border-slate-700 pl-3 border-l-2 border-l-orange-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">系统智能核价</div>
                      <div className="text-2xl font-bold text-orange-400">{result.price}</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">预计加工及履约周期</div>
                      <div className="text-lg font-bold text-white mt-1">{result.days}</div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-700 flex items-center justify-between">
                    <div className="text-xs text-slate-500 flex items-center">
                       <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                       模型置信度: {result.confidence}
                    </div>
                    <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-200">
                      确认方案并生成询价单
                    </Button>
                  </div>
               </div>
             )}

             {!loading && !result && (
               <div className="flex-1 flex items-center justify-center">
                 <p className="text-slate-600 font-mono text-sm text-center">系统待命。<br/>请在左侧上传文件以开始分析流程。</p>
               </div>
             )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}