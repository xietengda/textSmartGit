package com.wisdomapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.theweflex.react.WeChatPackage;
import org.reactnative.camera.RNCameraPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNViewShotPackage(),
            new RNFSPackage(),
            new NetInfoPackage(),
            new BlurViewPackage(),
            new OrientationPackage(),
            new ReactNativeAudioPackage(),
            new WeChatPackage(),
            new RNCameraPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new RNSoundPackage(),
            new ReactVideoPackage(),
            new PickerPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
