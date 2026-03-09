import { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import WarningBanner from './components/Layout/WarningBanner';
import ControlPanel from './components/Controls/ControlPanel';
import ResetButton from './components/Controls/ResetButton';
import ChatWindow from './components/Chat/ChatWindow';
import { useChat } from './hooks/useChat';
import './styles/index.css';

function App() {
  const [threshold, setThreshold] = useState(50);
  // ✅ Передаем threshold в хук
  const { messages, isLoading, agentStatus, sendMessage, resetChat } = useChat(threshold);

  const handleThresholdChange = (value: number) => {
    setThreshold(value);
  };

  const handleResetChat = () => {
    if (confirm('Начать новый диалог? История текущего диалога будет очищена.')) {
      resetChat();
    }
  };

  const questionCount = messages.filter(m => m.sender === 'user').length;

  return (
    <div className="container mx-auto max-w-4xl px-4 pt-4 md:px-6 md:pt-6 flex flex-col min-h-screen">
      <Header />
      
      <main className="grow">
        <ControlPanel 
          threshold={threshold}
          onThresholdChange={handleThresholdChange}
          questionCount={questionCount}
        />

        <ResetButton onReset={handleResetChat} />

        <ChatWindow 
          messages={messages}
          isLoading={isLoading}
          agentStatus={agentStatus}
          onSendMessage={sendMessage}  // sendMessage уже знает про threshold!
        />
      </main>

      <WarningBanner />
      <Footer />
    </div>
  );
}

export default App;