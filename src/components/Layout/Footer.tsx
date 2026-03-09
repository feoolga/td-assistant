// =============================================
// Компонент: Footer
// Путь: src/components/Layout/Footer.tsx
// Назначение: Подвал с информацией о проекте и команде
// =============================================

const Footer = () => {
  return (
    <footer className="mt-2 pb-4 text-center text-gray-500 text-sm">
      <p>Демо-версия интеллектуальной системы поиска. Ответы могут содержать неточности.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
        <span>
          <i className="fas fa-brain mr-1"></i> Модель: Команда Сидорова Ивана Александровича
        </span>
        <span>
          <i className="fas fa-code mr-1"></i> Интерфейс: Феофанова Ольга
        </span>
        <span>
          <i className="far fa-calendar mr-1"></i> 2026
        </span>
      </div>
    </footer>
  );
};

export default Footer;