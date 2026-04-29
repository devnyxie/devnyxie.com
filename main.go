package main

import (
	"fmt"
	"time"

	sys "golang.org/x/sys/unix"
)

func mib(x uint64) uint64 {
	x = x / (1024 * 1024)
	return x
}

type Output struct {
	UsedRamPercentage int
}

func checker(o *Output) {
	tick := time.NewTicker(1 * time.Second)
	defer tick.Stop()
	for range tick.C {
		sysinfo := &sys.Sysinfo_t{}
		err := sys.Sysinfo(sysinfo)
		if err != nil {
			fmt.Println("couldn't get system's RAM usage, error:", err)
			return
		}
		usedRam := sysinfo.Totalram - sysinfo.Freeram
		usedRamPercentage := float64(usedRam) / float64(sysinfo.Totalram) * 100
		fmt.Printf("RAM: %d/100%%\n", int(usedRamPercentage))
		o.UsedRamPercentage = int(usedRamPercentage)
	}
}

func main() {
	output := &Output{}
	go checker(output)
	time.Sleep(5 * time.Second)
}
