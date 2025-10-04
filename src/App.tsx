import { useState, useEffect } from 'react';
import { Users, Crown, Shield, MessageCircle, Play, Youtube } from 'lucide-react';
import HumanVerification from './components/HumanVerification';

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const leaders = [
    { name: 'Robert', username: 'xxi7', role: 'مسؤول العصابات', icon: Shield },
    { name: 'Abdo Zoul', username: 'abdozoul', role: 'مسؤول العصابات', icon: Shield },
    { name: 'Ineista', username: 'ak.7a', role: 'رئيس العصابة', icon: Crown },
    { name: 'xCristiano', username: 'c_aj', role: 'نائب رئيس العصابة ( الــســابــق )', icon: Crown },
    { name: 'xAbdo', username: 'bb5v', role: 'عم الناس الشرقاوي', icon: Crown },
    { name: 'xRonaldo', username: 'ff1sxxc', role: 'نائب رئيس العصابة', icon: Crown },
    { name: 'xDemon', username: 'cox.p', role: 'نائب رئيس العصابة', icon: Users },
    { name: 'Hector', username: 'qwm_', role: 'مسؤول احتلالات', icon: Users },
    { name: 'Fady', username: '3j.xx', role: 'مسؤول سرقات', icon: Users },
    { name: 'xTylor', username: '.maybeimwrong', role: 'مسؤل الاعضاء', icon: Users },
    { name: 'xShbonke', username: 'shbonke', role: 'Leader', icon: Users },
    { name: 'xOmar', username: 'omarxm', role: 'مسؤول العصابه', icon: Crown },
  ];

  const images = [
    'https://cdn.discordapp.com/attachments/1408128989608022127/1423936841467433082/1.png?ex=68e22006&is=68e0ce86&hm=e9c76a37aa6b8790a44b8ee5caea8ccd73cd373c8e76e395e64db26145cc94ce&',
    'https://cdn.discordapp.com/attachments/1408128989608022127/1423936841895117003/2.png?ex=68e22006&is=68e0ce86&hm=b8123d3ce6e121d72a2dd787edfb8b69a2cb9d13d1d5884b580205cdfc0c1d48&',
    'https://cdn.discordapp.com/attachments/1408128989608022127/1423936842260156537/3.png?ex=68e22006&is=68e0ce86&hm=8a9cbae2a0ff66a9717a8097be60d37d9888f1a9c4389e258252237b365e9f41&',
    'https://cdn.discordapp.com/attachments/1408128989608022127/1423936842708811917/4.png?ex=68e22006&is=68e0ce86&hm=312e6748ab17c9d6496f0e11230b50cece31facb7378df59d2efd11634c1ea8e&'
  ];

  const videos = [
    { id: 'ZlzjE4V4M1M', title: 'W.Walker is Back ??' },
    { id: 'SRRZzrLqYqs', title: 'جلد عصابات في خادم The North' },
    { id: 'pEiKuBmp_Jo', title: 'Cheating in The North' },
    { id: 'IaYpO5iHnDc', title: 'W.Walker Gang is Back' },
    { id: 'jYJ3PeL9NHU', title: '#تحديد_كل - The North' },
    { id: 'edGwbo1mqG8', title: 'جلد الأسكوبار مقطع خفيف دقيقة واحده #The North Mta' },
    { id: '2Kkfy-5NKvA', title: 'لـمـا انـيـسـتـا | جـلد سيرفر ذا نورث | MTA : the North' },
  ];

  const youtubeChannels = [
    {
      name: 'Official Demon',
      handle: '@mohamedabdelaal-k',
      channelId: 'UCu1kamQgTPc-6NVRbjmQm9g',
      url: 'https://www.youtube.com/@mohamedabdelaal-k',
      image: 'https://cdn.discordapp.com/attachments/1408128989608022127/1423936843509923881/Demon.png?ex=68e22006&is=68e0ce86&hm=94c523b112304bd799e393664408b9e741f5355a0c13cf6e0a430b25ff821dc2&',
    },
    {
      name: 'هـيـكـتـور ',
      handle: '@TnTeF',
      channelId: 'UCH8eAKAZBr5PGz-QONhKI1Q',
      url: 'https://www.youtube.com/channel/UCH8eAKAZBr5PGz-QONhKI1Q',
      image: 'https://cdn.discordapp.com/attachments/1408128989608022127/1423936843971301446/Hector.png?ex=68e22007&is=68e0ce87&hm=0c34abef4c5ce97d0992032763204e2c8c254d7c00a05105f176f5c48e326f52&',
    },
    {
      name: 'Maher_Gamaing',
      handle: '@maher11-c2x',
      channelId: 'UCWDye2RqWJF_7VPns84oD5Q',
      url: 'https://www.youtube.com/channel/UCWDye2RqWJF_7VPns84oD5Q',
      image: 'https://cdn.discordapp.com/attachments/1408128989608022127/1423936828607565894/Maher.png?ex=68e22003&is=68e0ce83&hm=6d91cbbc602814c2a205daca5e8462cde6ea0ab92a2b95e17e48d13aa4e03ae4&',
    },
    {
      name: 'OMAR',
      handle: '@9ww9.',
      channelId: 'UCKRhuE_oBcQkDKLvsefpR0g',
      url: 'https://www.youtube.com/channel/UCKRhuE_oBcQkDKLvsefpR0g',
      image: 'https://cdn.discordapp.com/attachments/1408128989608022127/1423936829308145674/Omar.png?ex=68e22003&is=68e0ce83&hm=7763facdfcc569f63e1ff017ce1500688f220e26867e85eb79f123e55524feaf&',
    },
    {
      name: 'SHBONKE',
      handle: '@shbonke',
      channelId: 'UCFIDL6D2YYfI8scImGDTzJA',
      url: 'https://www.youtube.com/channel/UCFIDL6D2YYfI8scImGDTzJA',
      image: 'https://cdn.discordapp.com/attachments/1408128989608022127/1423936829672915004/Shbonke.png?ex=68e22003&is=68e0ce83&hm=9518d7ce77d4eb03b5432b1cb0f3c7dac0d18329ec22426b86f0f39e0bf44ba8&',
    },
    {
      name: 'Iniesta Simeone',
      handle: '@K4H-0-k4h',
      channelId: 'UCT2zhvoJy47r7x0mKDoPBNQ',
      url: 'https://www.youtube.com/channel/UCT2zhvoJy47r7x0mKDoPBNQ',
      image: 'https://cdn.discordapp.com/attachments/1408128989608022127/1423936827860979762/Iniesta.png?ex=68e22003&is=68e0ce83&hm=8c35e42688655cc4d2eca3beec634c899b6d577db00bb6c4e24c22bed7a34e83&',
    },
  ];

  useEffect(() => {
    const verified = localStorage.getItem('humanVerified');
    const verificationTime = localStorage.getItem('verificationTime');

    if (verified && verificationTime) {
      const timePassed = Date.now() - parseInt(verificationTime);
      const hoursPassed = timePassed / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        setIsVerified(true);
      } else {
        localStorage.removeItem('humanVerified');
        localStorage.removeItem('verificationTime');
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isVerified) {
      setIsVisible(true);
      const imageInterval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length);
      }, 4000);
      let videoInterval: NodeJS.Timeout;
      if (playingVideo === null) {
        videoInterval = setInterval(() => {
          setActiveVideo((prev) => (prev + 1) % videos.length);
        }, 5000);
      }
      return () => {
        clearInterval(imageInterval);
        if (videoInterval) clearInterval(videoInterval);
      };
    }
  }, [isVerified, playingVideo]);

  const handleVerified = () => {
    setIsVerified(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="animate-pulse text-blue-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isVerified) {
    return <HumanVerification onVerified={handleVerified} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-950 text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in">
            <img
              src="https://cdn.discordapp.com/attachments/1408128989608022127/1423936828276473937/logo.png?ex=68e22003&is=68e0ce83&hm=cfe8cc664448a16c03874f209c47e9c4099d69260b1a1e3d5bf800c0007e2061&"
              alt="W.Walker Logo"
              className="h-16 w-16 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              W.Walker
            </h1>
          </div>
          <a
            href="https://discord.gg/G5tpHWSBQr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>انضم للديسكورد</span>
          </a>
        </div>
      </header>

      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-6xl md:text-7xl font-black mb-4 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              عصابة
            </span>
            {' '}
            <span className="text-white">W.Walker</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-300 font-semibold">
            # W.Walker On Top
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-20">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30">
            {images.map((img, index) => (
              <div
                key={img}
                className={`absolute inset-0 transition-all duration-1000 transform ${
                  activeImage === index
                    ? 'opacity-100 scale-100 rotate-0'
                    : 'opacity-0 scale-95 rotate-3'
                }`}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-blue-900/30"></div>

                <div
                  className={`absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-32 ${
                    activeImage === index ? 'animate-scan' : ''
                  }`}
                ></div>

                <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-blue-400"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-blue-400"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-blue-400"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-blue-400"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeImage === index ? 'w-12 bg-blue-500' : 'w-2 bg-blue-900 hover:bg-blue-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Play className="w-10 h-10 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              فيديوهات العصابة
            </span>
          </h3>

          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 min-h-[400px]">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    activeVideo === index
                      ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                      : 'opacity-0 scale-95 z-0 pointer-events-none'
                  }`}
                >
                  <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-4 border-blue-500/30 group">
                    {playingVideo === index ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
                          }}
                        />

                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/60"
                          onClick={() => setPlayingVideo(index)}
                        >
                          <div className="bg-blue-600 rounded-full p-6 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 shadow-2xl shadow-blue-500/50">
                            <Play className="w-16 h-16 text-white fill-white" />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="absolute top-2 left-2 w-8 h-8 border-t-3 border-l-3 border-blue-400 pointer-events-none"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-3 border-r-3 border-blue-400 pointer-events-none"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-3 border-l-3 border-blue-400 pointer-events-none"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-3 border-r-3 border-blue-400 pointer-events-none"></div>
                  </div>

                  <div className="mt-4 text-center">
                    <h4 className="text-xl font-bold text-blue-300">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveVideo(index);
                    setPlayingVideo(null);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeVideo === index ? 'w-12 bg-blue-500' : 'w-2 bg-blue-900 hover:bg-blue-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Youtube className="w-10 h-10 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              قنوات العصابة
            </span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeChannels.map((channel, index) => (
              <a
                key={channel.channelId}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-slate-900/90 to-blue-950/90 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'slideUp 0.6s ease-out forwards' : 'none',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-500/10 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg overflow-hidden">
                      <img
                        src={channel.image}
                        alt={channel.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://unavatar.io/youtube/${channel.handle}`;
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-1 truncate">
                      {channel.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">{channel.handle}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">--</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        <span className="font-semibold">--</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-500/30 rounded-tr-xl"></div>

                <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Youtube className="w-8 h-8 text-red-500" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Crown className="w-10 h-10 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              قادة العصابة
            </span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, index) => {
              const Icon = leader.icon;
              return (
                <div
                  key={leader.name}
                  className="group relative bg-gradient-to-br from-slate-900/90 to-blue-950/90 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? 'slideUp 0.6s ease-out forwards' : 'none',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                  <div className="relative flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {leader.name}
                      </h4>
                      <p className="text-blue-400/80 text-xs font-mono mb-1">@{leader.username}</p>
                      <p className="text-blue-300 text-sm">{leader.role}</p>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-500/30 rounded-tr-xl"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 container mx-auto px-6 py-8 mt-20 border-t border-blue-900/30">
        <div className="text-center text-blue-400">
          <p className="text-lg font-semibold">© 2025 W.Walker Gang • The North</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
