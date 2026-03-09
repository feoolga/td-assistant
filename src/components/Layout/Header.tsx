// =============================================
// Компонент: Header
// Путь: src/components/Layout/Header.tsx
// Назначение: Заголовок страницы с описанием
// =============================================

const Header = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        <i className="fas fa-robot text-cyan-600 mr-2"></i>
        RAG-ассистент по технической документации
      </h1>
      <p className="text-gray-600">
        Демонстрация интеллектуального поиска по техдокументации
      </p>
    </header>
  );
};

export default Header;