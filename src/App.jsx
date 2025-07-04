import { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige o ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState('');
  const [localizacao, setLocalizacao] = useState(null);

  useEffect(() => {
    fetch("https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/")
      .then((res) => res.json())
      .then((data) => {
        if (data.Msg === "Sucesso ao Encontrar usuário.") {
          setUsuarios(data.Dados);
        } else {
          setErro("Erro ao carregar usuários.");
        }
      })
      .catch(() => {
        setErro("Erro ao conectar com a API.");
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const cidade =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Cidade não encontrada";

            const estado = data.address.state || "Estado não encontrado";

            setLocalizacao({ latitude, longitude, cidade, estado });
          } catch (e) {
            setLocalizacao({
              latitude,
              longitude,
              cidade: "Erro ao obter cidade",
              estado: "Erro",
            });
          }
        },
        () => {
          setLocalizacao({ erro: "Não foi possível obter localização" });
        }
      );
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Usuários Calpar</h1>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <table className="tabela-motoristas">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.Nome}</td>
              <td className={usuario.Disponivel ? 'disponivel' : 'indisponivel'}>
                {usuario.Disponivel ? '✅ Disponível' : '❌ Indisponível'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Localização do Usuário</h2>
      {localizacao ? (
        localizacao.erro ? (
          <p>{localizacao.erro}</p>
        ) : (
          <>
            <p>
              Latitude: {localizacao.latitude}, Longitude: {localizacao.longitude}
              <br />
              Cidade: {localizacao.cidade}
              <br />
              Estado: {localizacao.estado}
            </p>
            <div style={{ height: '300px', marginTop: '1rem' }}>
              <MapContainer
                center={[localizacao.latitude, localizacao.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', borderRadius: '8px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[localizacao.latitude, localizacao.longitude]}>
                  <Popup>
                    Você está aqui: {localizacao.cidade} - {localizacao.estado}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </>
        )
      ) : (
        <p>Carregando localização...</p>
      )}
    </div>
  );
}

export default App;
