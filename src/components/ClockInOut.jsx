import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { formatDate, getDurationBetween } from '../utils/dateFormatter';
import { useCurrentTime } from '../hooks/useCurrentTime';
import './ClockInOut.css';

dayjs.locale('id');

const ClockInOut = () => {
  const { time: currentTime, date: currentDate } = useCurrentTime();
  const webcamRefIn  = useRef(null);
  const webcamRefOut = useRef(null);
  const [capturedPhotoIn,  setCapturedPhotoIn]  = useState(null);
  const [capturedPhotoOut, setCapturedPhotoOut] = useState(null);
  const [clockInData,  setClockInData]  = useState(null);
  const [clockOutData, setClockOutData] = useState(null);
  const [showCameraView, setShowCameraView] = useState(false);

  const capturePhotoIn  = () => setCapturedPhotoIn(webcamRefIn.current.getScreenshot());
  const capturePhotoOut = () => setCapturedPhotoOut(webcamRefOut.current.getScreenshot());

  const handleClockIn = () => {
    if (capturedPhotoIn) {
      setClockInData({
        photo: capturedPhotoIn,
        time: dayjs().format('HH:mm:ss'),
        date: formatDate(),
        timestamp: dayjs().valueOf(),
      });
      setCapturedPhotoIn(null);
    }
  };

  const handleClockOut = () => {
    if (capturedPhotoOut && clockInData) {
      setClockOutData({
        photo: capturedPhotoOut,
        time: dayjs().format('HH:mm:ss'),
        date: formatDate(),
        timestamp: dayjs().valueOf(),
      });
      setCapturedPhotoOut(null);
    }
  };

  const resetAll = () => {
    setClockInData(null);
    setClockOutData(null);
    setCapturedPhotoIn(null);
    setCapturedPhotoOut(null);
    setShowCameraView(false);
  };

  const duration = clockInData && clockOutData
    ? getDurationBetween(clockInData.timestamp, clockOutData.timestamp)
    : null;

  return (
    <div className="clock-container" style={{
      minHeight: '100vh',
      background: '#fafafa',
      padding: '32px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '680px' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)',
            borderRadius: '20px', padding: '5px 14px', marginBottom: '16px',
          }}>
            <span style={{ fontSize: '13px' }}>⏱</span>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#7c3aed', textTransform: 'uppercase' }}>
              Attendance System
            </span>
          </div>
          <h1 style={{
            fontSize: '36px', fontWeight: 700, margin: '0 0 6px',
            color: '#1a1025', letterSpacing: '-0.8px', lineHeight: 1.2,
          }}>
            Clock In &amp; Out
          </h1>
          <p style={{ color: '#9c8fa8', fontSize: '14px' }}>Rekam kehadiran harian Anda</p>
        </div>

        {/* ── Digital Clock Card ── */}
        <div className="clock-card" style={{ padding: '24px 28px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#9c8fa8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                Waktu Sekarang
              </p>
              <p className="clock-display time-display" style={{
                fontSize: '44px', fontWeight: 700, color: '#1a1025',
                lineHeight: 1, letterSpacing: '-1px',
              }}>
                {currentTime}
              </p>
            </div>
            <div className="divider-v" style={{ flexShrink: 0 }} />
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#9c8fa8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                Hari Ini
              </p>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#1a1025' }}>{currentDate}</p>
            </div>
          </div>
        </div>

        {/* ── Status Row ── */}
        {!showCameraView && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {/* Clock In Status */}
            <div className={`clock-card ${clockInData ? 'clock-card--success' : ''}`} style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '18px' }}>🟢</span>
                <span className={`badge ${clockInData ? 'badge--done-green' : 'badge--pending'}`}>
                  {clockInData ? 'Recorded' : 'Pending'}
                </span>
              </div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#9c8fa8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                Clock In
              </p>
              <p className="time-display" style={{
                fontSize: '26px', fontWeight: 700,
                color: clockInData ? '#059669' : '#d1c8e0',
              }}>
                {clockInData ? clockInData.time : '--:--:--'}
              </p>
            </div>

            {/* Clock Out Status */}
            <div className={`clock-card ${clockOutData ? 'clock-card--danger' : ''}`} style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '18px' }}>🔴</span>
                <span className={`badge ${clockOutData ? 'badge--done-red' : 'badge--pending'}`}>
                  {clockOutData ? 'Recorded' : 'Pending'}
                </span>
              </div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#9c8fa8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                Clock Out
              </p>
              <p className="time-display" style={{
                fontSize: '26px', fontWeight: 700,
                color: clockOutData ? '#dc2626' : '#d1c8e0',
              }}>
                {clockOutData ? clockOutData.time : '--:--:--'}
              </p>
            </div>
          </div>
        )}

        {/* ── Main CTA or Camera View ── */}
        {!showCameraView ? (
          <button
            className="btn btn-primary"
            onClick={() => setShowCameraView(true)}
            style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '12px' }}
          >
            📷 &nbsp;Mulai Absensi
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Clock In Card */}
            <div className="clock-card" style={{ overflow: 'hidden' }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #f0ecfa',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1a1025', fontSize: '15px' }}>Clock In</p>
                  <p style={{ fontSize: '12px', color: '#9c8fa8', marginTop: '2px' }}>Foto saat masuk</p>
                </div>
                <span className={`badge ${clockInData ? 'badge--done-green' : 'badge--pending'}`}>
                  {clockInData ? '✓ Done' : 'Active'}
                </span>
              </div>

              <div style={{ padding: '16px 20px' }}>
                {!clockInData ? (
                  !capturedPhotoIn ? (
                    <>
                      <div className="camera-frame" style={{ marginBottom: '12px' }}>
                        <Webcam
                          ref={webcamRefIn}
                          screenshotFormat="image/jpeg"
                          videoConstraints={{ facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <button className="btn btn-success" onClick={capturePhotoIn} style={{ width: '100%' }}>
                        📷 &nbsp;Ambil Foto
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="camera-frame" style={{ marginBottom: '12px' }}>
                        <img src={capturedPhotoIn} alt="Preview" />
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-success" onClick={handleClockIn} style={{ flex: 1 }}>
                          ✓ &nbsp;Konfirmasi
                        </button>
                        <button className="btn btn-ghost" onClick={() => setCapturedPhotoIn(null)} style={{ flex: 1 }}>
                          🔄 &nbsp;Ulangi
                        </button>
                      </div>
                    </>
                  )
                ) : (
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={clockInData.photo} alt="Clock In" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#9c8fa8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Waktu Masuk</p>
                      <p className="time-display" style={{ fontSize: '24px', fontWeight: 700, color: '#059669' }}>{clockInData.time}</p>
                      <p style={{ fontSize: '12px', color: '#9c8fa8' }}>{clockInData.date}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Clock Out Card */}
            <div className="clock-card" style={{ overflow: 'hidden' }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #f0ecfa',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1a1025', fontSize: '15px' }}>Clock Out</p>
                  <p style={{ fontSize: '12px', color: '#9c8fa8', marginTop: '2px' }}>Foto saat pulang</p>
                </div>
                <span className={`badge ${clockOutData ? 'badge--done-red' : 'badge--pending'}`}>
                  {clockOutData ? '✓ Done' : 'Active'}
                </span>
              </div>

              <div style={{ padding: '16px 20px' }}>
                {!clockInData ? (
                  <div style={{ textAlign: 'center', padding: '24px 0', color: '#c4b8d4' }}>
                    <p style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</p>
                    <p style={{ fontSize: '13px', fontWeight: 500 }}>Lakukan Clock In terlebih dahulu</p>
                  </div>
                ) : !clockOutData ? (
                  !capturedPhotoOut ? (
                    <>
                      <div className="camera-frame" style={{ marginBottom: '12px', borderColor: 'rgba(220,38,38,0.2)' }}>
                        <Webcam
                          ref={webcamRefOut}
                          screenshotFormat="image/jpeg"
                          videoConstraints={{ facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <button className="btn btn-danger" onClick={capturePhotoOut} style={{ width: '100%' }}>
                        📷 &nbsp;Ambil Foto
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="camera-frame" style={{ marginBottom: '12px', borderColor: 'rgba(220,38,38,0.2)' }}>
                        <img src={capturedPhotoOut} alt="Preview" />
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-danger" onClick={handleClockOut} style={{ flex: 1 }}>
                          ✓ &nbsp;Konfirmasi
                        </button>
                        <button className="btn btn-ghost" onClick={() => setCapturedPhotoOut(null)} style={{ flex: 1 }}>
                          🔄 &nbsp;Ulangi
                        </button>
                      </div>
                    </>
                  )
                ) : (
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={clockOutData.photo} alt="Clock Out" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#9c8fa8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Waktu Pulang</p>
                      <p className="time-display" style={{ fontSize: '24px', fontWeight: 700, color: '#dc2626' }}>{clockOutData.time}</p>
                      <p style={{ fontSize: '12px', color: '#9c8fa8' }}>{clockOutData.date}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Duration */}
            {duration && (
              <div className="duration-pill" style={{ padding: '20px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#9c8fa8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  Durasi Kerja
                </p>
                <p className="time-display" style={{
                  fontSize: '40px', fontWeight: 700, color: '#7c3aed',
                  letterSpacing: '-0.5px',
                }}>
                  {duration.hours}h {duration.minutes}m
                </p>
                <p style={{ fontSize: '13px', color: '#9c8fa8', marginTop: '4px' }}>
                  {clockInData.time} → {clockOutData.time}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-ghost"
                onClick={() => setShowCameraView(false)}
                style={{ flex: 1 }}
              >
                ← Kembali
              </button>
              {clockInData && clockOutData && (
                <button
                  className="btn btn-primary"
                  onClick={resetAll}
                  style={{ flex: 1 }}
                >
                  🔄 &nbsp;Sesi Baru
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClockInOut;
