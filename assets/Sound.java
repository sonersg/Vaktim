package com.expoalarmmodule;

import android.content.Context;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.provider.Settings;
import android.util.Log;
import android.os.Handler;
import android.os.Looper;

class Sound {

    private static final String TAG = "AlarmSound";
    private static final long DEFAULT_VIBRATION = 500;

    private AudioManager audioManager;
    private int userVolume;
    private MediaPlayer mediaPlayer;
    private Vibrator vibrator;

    private Context context;

    Sound(Context context) {
        this.context = context;
        this.vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
        this.audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
        this.userVolume = audioManager.getStreamVolume(AudioManager.STREAM_ALARM);
        this.mediaPlayer = new MediaPlayer();
    }

    void play(String sound) {
        Uri soundUri = getSoundUri(sound);
        // playSound(soundUri);
        startVibration();

        // Stop alarm automatically after 5 seconds
        new Handler(Looper.getMainLooper()).postDelayed(this::stop, 11111);
    }

    void stop() {
        try {
            // if (mediaPlayer.isPlaying()) {
                stopVibration();
                stopSound();
                mediaPlayer.release();
            // }
        } catch (IllegalStateException e) {
            Log.d(TAG, "Sound has probably been released already");
        }
    }

    private void playSound(Uri soundUri) {
        try {
            if (!mediaPlayer.isPlaying()) {
                mediaPlayer.setScreenOnWhilePlaying(true);
                mediaPlayer.setAudioStreamType(AudioManager.STREAM_ALARM);
                mediaPlayer.setDataSource(context, soundUri);
                mediaPlayer.setVolume(99, 99);
                mediaPlayer.setLooping(false);
                mediaPlayer.prepare();
                mediaPlayer.start();
            }
        } catch (Exception e) {
            Log.e(TAG, "Failed to play sound", e);
        }
    }

    private void stopSound() {
        try {
            // reset the volume to what it was before we changed it.
            audioManager.setStreamVolume(AudioManager.STREAM_ALARM, userVolume, AudioManager.FLAG_PLAY_SOUND);
            mediaPlayer.stop();
            mediaPlayer.reset();
        } catch (Exception e) {
            e.printStackTrace();
            Log.e(TAG, "ringtone: " + e.getMessage());
        }
    }

    private void startVibration() {
        vibrator.vibrate(DEFAULT_VIBRATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createOneShot(5000, VibrationEffect.DEFAULT_AMPLITUDE));
        } else {
            //deprecated in API 26
            vibrator.vibrate(500);
        }

        long[] pattern = {0, 300, 200, 200, 500};

        // The '0' here means to repeat indefinitely
        // '0' is actually the index at which the pattern keeps repeating from (the start)
        // To repeat the pattern from any other point, you could increase the index, e.g. '1'
        vibrator.vibrate(pattern, 0);
    }

    private void stopVibration() {
        vibrator.cancel();
    }

    private Uri getSoundUri(String soundName) {
        Uri soundUri;
        if (soundName.equals("default")) {
            soundUri = Settings.System.DEFAULT_NOTIFICATION_URI;
        } else {
            int resId;
            if (context.getResources().getIdentifier(soundName, "raw", context.getPackageName()) != 0) {
                resId = context.getResources().getIdentifier(soundName, "raw", context.getPackageName());
            } else {
                soundName = soundName.substring(0, soundName.lastIndexOf('.'));
                resId = context.getResources().getIdentifier(soundName, "raw", context.getPackageName());
            }
            soundUri = Uri.parse("android.resource://" + context.getPackageName() + "/" + resId);
        }
        
        return soundUri;
    }
}
